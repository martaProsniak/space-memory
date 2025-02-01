import {Injectable} from '@angular/core';
import {Game} from './game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private game: Game;

  constructor() {
    this.game = new Game();
    console.log(this.game.deck);
  }

  getDeck() {
    return [...this.game.deck];
  }
}
