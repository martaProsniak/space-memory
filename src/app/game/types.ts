export interface Card {
  faceUrl: string;
  backUrl: string;
  isFlipped: boolean;
  id: string;
  isHidden: boolean;
}

export type PairsCount = 4 | 6 | 10

export type Difficulty = 'easy' | 'normal' | 'hard';
