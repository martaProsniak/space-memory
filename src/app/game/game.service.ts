import {Injectable, signal, Signal} from '@angular/core';
import {Game} from './game.model';
import {Card} from './types';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private game: Game;
  private firstFlippedCard: Card | null = null;
  private secondFlippedCard: Card | null = null;
  deck: Card[] = [];
  canFlip = true;

  constructor() {
    this.game = new Game();
    this.deck = this.getDeck();
  }

  getDeck() {
    return [...this.game.deck];
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
    console.log('Handle match')
    if (!this.firstFlippedCard || !this.secondFlippedCard) {
      return;
    }
    setTimeout(() => {
      this.deck
        .filter(card => card.isFlipped)
        .forEach((card: Card) => {
          card.isHidden = true;
        })
      this.resetFlippedCards();
    }, 1000)
  }

  handleNoMatch() {
    console.log('Handle no match')
    if (!this.firstFlippedCard || !this.secondFlippedCard) {
      return;
    }
    setTimeout(() => {
      this.deck
        .filter(card => (card.isFlipped))
        .forEach((card: Card) => {
          card.isFlipped = false;
        })
      this.resetFlippedCards();
    }, 1000)
  }

  resetFlippedCards() {
    this.firstFlippedCard = null;
    this.secondFlippedCard = null;
    this.canFlip = true;
  }
}
