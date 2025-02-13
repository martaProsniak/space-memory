import { Component } from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'user-actions',
  imports: [],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css'
})
export class ActionsComponent {
  constructor(private gameService: GameService) {

  }

  restartGame() {
    this.gameService.startNewGame();
  }
}
