import {Injectable, signal, WritableSignal} from '@angular/core';
import {Game} from './game.model';
import {Card} from './types';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private game: Game | null = null;
  private firstFlippedCard: Card | null = null;
  private secondFlippedCard: Card | null = null;
  private deck: WritableSignal<Card[]> = signal([]);
  score = signal(0);
  turnCount = signal(0);
  isBonusTurn = signal(false);
  canFlip = true;
  gameStatus: WritableSignal<'pending' | 'fail' | 'win'> = signal('pending');

  constructor() {
    this.startNewGame();
  }

  startNewGame() {
    this.game = new Game();
    this.deck.set(this.game.deck);
    this.score.set(this.game.initialScore);
    this.turnCount.set(this.getTurnCount());
    this.gameStatus.set('pending');
    this.canFlip = true;
  }

  getTurnCount() {
    if (this.game!.maxPairsCount === 4) {
      return 8;
    }
    if (this.game!.maxPairsCount === 10) {
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
      this.score.update((score) => score + 1);
      this.isBonusTurn.set(true);
      this.resetFlippedCards();
    }, 1000)
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
      this.turnCount.update((turnCount) => turnCount - 1);
      this.isBonusTurn.set(false);
      this.resetFlippedCards();
    }, 1000)
  }

  resetFlippedCards() {
    this.firstFlippedCard = null;
    this.secondFlippedCard = null;
    this.checkResult();
    this.canFlip = this.gameStatus() === 'pending';
  }

  hasLost() {
    return this.turnCount() < 1 && this.score() < this.game!.maxPairsCount;
  }

  hasWin() {
    return this.score() === this.game!.maxPairsCount;
  }

  checkResult() {
    if (this.hasLost()) {
      this.gameStatus.set('fail');
      return;
    }
    if (this.hasWin()) {
      this.gameStatus.set('win');
      return;
    }
  }
}
