import {Component, Input} from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'start-game-btn',
  imports: [],
  templateUrl: './start-game-btn.component.html',
  styleUrl: './start-game-btn.component.css'
})
export class StartGameBtnComponent {
  @Input() text = 'New game'
  @Input() colored = false;
  constructor(private gameService: GameService) {
  }

  restartGame() {
    this.gameService.startNewGame();
  }
}
