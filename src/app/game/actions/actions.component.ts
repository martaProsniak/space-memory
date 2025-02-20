import {Component, OnInit} from '@angular/core';
import {GameService} from '../game.service';
import {Difficulty, PairsCount} from '../types';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'user-actions',
  imports: [
    FormsModule
  ],
  templateUrl: './actions.component.html',
  styleUrl: './actions.component.css'
})
export class ActionsComponent implements OnInit {
  difficulty: Difficulty;

  constructor(private gameService: GameService) {
    this.difficulty = this.gameService.getDifficulty();
  }

  ngOnInit() {
    const difficulty = localStorage.getItem('difficulty') as Difficulty | null;
    if (!difficulty) {
      return;
    }
    this.difficulty = difficulty;
    this.gameService.setDifficulty(difficulty as Difficulty);
  }

  restartGame() {
    this.gameService.startNewGame();
  }

  handleChange() {
    this.gameService.setDifficulty(this.difficulty);
    localStorage.setItem('difficulty', `${this.difficulty}`);
  }
}
