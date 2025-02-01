import {Card} from './types';

const CARD_FACES = [
  'astronaut', 'blaster', 'earth', 'flag', 'moon', 'rocket', 'sun'
]

const CARD_BACK = 'alien';

export class Game {
  score = 0;
  turnCount = 10;
  maxPairsCount: 4 | 6 | 9 = 6;
  deck: Card[] = [];

  constructor() {
    this.deck = this.shuffleCards(this.createNewDeck());
  }

  createNewDeck = () => {
    return [...this.createHalfDeck('first'), ...this.createHalfDeck('second')];
  }

  createHalfDeck(occurrence: 'first' | 'second'): Card[] {
    return CARD_FACES.slice(0, this.maxPairsCount).map((face) => {
      return {
        faceUrl: `url("${face}.png")`,
        backUrl: `url("${CARD_BACK}.png")`,
        isFlipped: false,
        id: `${face}-${occurrence}`,
        isHidden: false,
      }
    });
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
