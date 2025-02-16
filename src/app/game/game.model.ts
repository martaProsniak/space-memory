import {Card, PairsCount} from './types';

const CARD_FACES = [
  'astronaut', 'blaster', 'earth', 'moon', 'rocket', 'sun', 'saturn', 'ship', 'ufo', 'universe'
]

const CARD_BACK = 'alien';

export class Game {
  initialScore: number;
  maxPairsCount: PairsCount;
  deck: Card[] = [];

  constructor(pairsCount: PairsCount = 6) {
    this.maxPairsCount = pairsCount;
    this.deck = this.shuffleCards(this.createNewDeck());
    this.initialScore = 0;
    console.log(this.deck)
  }

  createNewDeck = () => {
    return [...this.createHalfDeck('first'), ...this.createHalfDeck('second')];
  }

  createHalfDeck(occurrence: 'first' | 'second'): Card[] {
    console.log(CARD_FACES.slice(0, this.maxPairsCount));
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
