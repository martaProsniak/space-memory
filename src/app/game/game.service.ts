import {effect, Injectable, signal, WritableSignal} from '@angular/core';
import {Game} from './game.model';
import {Card, Difficulty, PairsCount} from './types';

export const DIFFICULTY: Record<PairsCount, Difficulty> = {
  4: 'easy',
  6: 'normal',
  10: 'hard'
}

export const difficultyToPairsCountMap: Record<Difficulty, PairsCount> = {
  easy: 4,
  normal: 6,
  hard: 10
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private game: Game | null = null;
  private firstFlippedCard: Card | null = null;
  private secondFlippedCard: Card | null = null;
  private deck: WritableSignal<Card[]> = signal([]);
  private difficulty: Difficulty = 'normal';
  private pairsCount: PairsCount = difficultyToPairsCountMap[this.difficulty];
  private matchCount = 0;
  score = signal(0);
  turnCount = signal(0);
  isBonusTurn = signal(false);
  bestScore = signal(0);
  canFlip = true;
  gameStatus: WritableSignal<'pending' | 'fail' | 'win'> = signal('pending');

  constructor() {
    this.startNewGame();
  }

  getBestScore() {
    const savedScore = localStorage.getItem(`${this.difficulty}-best`);
    if (!savedScore) {
      this.bestScore.set(0);
      return;
    }
    this.bestScore.set(Number(savedScore));
  }

  startNewGame() {
    this.game = new Game(this.pairsCount);
    this.deck.set(this.game.deck);
    this.score.set(this.game.initialScore);
    this.turnCount.set(this.getTurnCount());
    this.gameStatus.set('pending');
    this.isBonusTurn.set(false);
    this.getBestScore();
    this.canFlip = true;
    this.matchCount = 0;
  }

  getTurnCount() {
    if (Number(this.pairsCount) === 4) {
      return 8;
    }
    if (Number(this.pairsCount) === 10) {
      return 25;
    }
    return 15;
  }

  getDeck() {
    return this.deck.asReadonly();
  }

  getProgress() {
    return {
      score: this.score,
      turnCount: this.turnCount,
      hasBonusTurn: this.isBonusTurn,
      gameStatus: this.gameStatus,
      bestScore: this.bestScore,
    };
  }

  flipCard(card: Card) {
    if (!this.canFlip) {
      return;
    }

    if (card.id === this.firstFlippedCard?.id) {
      return;
    }

    card.isFlipped = true;

    if (!this.firstFlippedCard) {
      this.firstFlippedCard = {...card};
      return;
    }

    this.secondFlippedCard = {...card};
    this.canFlip = false;
    this.compareTwoCards();
  }

  compareTwoCards() {
    if ((this.firstFlippedCard?.faceUrl === this.secondFlippedCard?.faceUrl)) {
      this.handleMatch();
    } else {
      this.handleNoMatch();
    }
  }

  handleMatch() {
    if (!this.firstFlippedCard || !this.secondFlippedCard) {
      return;
    }
    setTimeout(() => {
      this.deck()
        .filter(card => card.isFlipped)
        .forEach((card: Card) => {
          card.isHidden = true;
        })
      this.isBonusTurn.set(true);
      this.increaseScore();
      this.matchCount++;
      this.resetFlippedCards();
    }, 300);
  }

  handleNoMatch() {
    if (!this.firstFlippedCard || !this.secondFlippedCard) {
      return;
    }
    setTimeout(() => {
      this.deck()
        .filter(card => (card.isFlipped))
        .forEach((card: Card) => {
          card.isFlipped = false;
        })
      this.increaseScore();
      this.turnCount.update((turnCount) => turnCount - 1);
      this.isBonusTurn.set(false);
      this.resetFlippedCards();
    }, 750);
  }

  increaseScore() {
    this.score.update((score) => score + 1);
  }

  resetFlippedCards() {
    this.firstFlippedCard = null;
    this.secondFlippedCard = null;
    this.checkResult();
    this.canFlip = this.gameStatus() === 'pending';
  }

  hasLost() {
    return this.turnCount() < 1 && this.matchCount < Number(this.pairsCount);
  }

  hasWin() {
    return this.matchCount === Number(this.pairsCount);
  }

  checkResult() {
    console.log(this.matchCount, Number(this.pairsCount));
    if (this.hasLost()) {
      this.handleFail();
      return;
    }
    if (this.hasWin()) {
      this.handleWin();
      return;
    }
  }

  getDifficulty() {
    return this.difficulty;
  }

  setDifficulty(difficulty: Difficulty) {
    this.difficulty = difficulty;
    this.pairsCount = difficultyToPairsCountMap[this.difficulty];
    this.startNewGame();
  }

  updateBestScore() {
    localStorage.setItem(`${DIFFICULTY[this.pairsCount]}-best`, String(this.score()));
  }

  handleFail() {
    this.gameStatus.set('fail');
  }

  handleWin() {
    this.gameStatus.set('win');
    const savedScore = localStorage.getItem(`${DIFFICULTY[this.pairsCount]}-best`);
    if (!savedScore) {
      this.updateBestScore();
      return;
    }
    if (this.score() >= Number(savedScore)) {
      return;
    }
    this.updateBestScore();
  }
}
