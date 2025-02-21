import { Component } from '@angular/core';
import {GameService} from '../game.service';

@Component({
  selector: 'game-progress',
  imports: [],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  progress;

  constructor(private gameService: GameService) {
    this.progress = this.gameService.getProgress();
  }
}
