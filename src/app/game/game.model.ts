import {Card} from './types';

const CARD_FACES = [
  'astronaut', 'blaster', 'earth', 'flag', 'moon', 'rocket', 'sun'
]

const CARD_BACK = 'alien';

export class Game {
  score = 0;
  turnCount = 10;
  flippedCardIndex = -1;
  canFlip = true;
  maxPairsCount: 4 | 6 | 9 = 6;
  deck: Card[] = [];

  constructor() {
    this.deck = this.shuffleCards(this.createNewDeck());
  }

  createNewDeck = () => {
    const singleCards = CARD_FACES.slice(0, this.maxPairsCount).map((face) => {
        return {
          faceUrl: `url("${face}.png")`,
          backUrl: `url("${CARD_BACK}.png")`,
          isFlipped: false
        }
    });
    return [...singleCards, ...singleCards];
  }

  shuffleCards(deck: Card[]) {
    const getRandom = (floor: number, ceiling: number) => {
      return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
    };

    for (let i = 0; i < deck.length; i++) {
      const randomChoiceIndex = getRandom(i, deck.length - 1);
      [deck[i], deck[randomChoiceIndex]] = [deck[randomChoiceIndex], deck[i]];
    }
    return deck;

  }

}
