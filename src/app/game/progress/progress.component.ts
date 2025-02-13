import { Component } from '@angular/core';
import {GameService} from '../game.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'game-progress',
  imports: [
    NgIf
  ],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {
  progress;

  constructor(private gameService: GameService) {
    this.progress = this.gameService.getProgress();
  }
}
