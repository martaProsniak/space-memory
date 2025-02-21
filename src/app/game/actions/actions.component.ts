import {Component, OnInit} from '@angular/core';
import {GameService} from '../game.service';
import {Difficulty, PairsCount} from '../types';
import {FormsModule} from '@angular/forms';
import {StartGameBtnComponent} from '../start-game-btn/start-game-btn.component';

@Component({
  selector: 'user-actions',
  imports: [
    FormsModule,
    StartGameBtnComponent
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

  handleChange() {
    this.gameService.setDifficulty(this.difficulty);
    localStorage.setItem('difficulty', `${this.difficulty}`);
  }
}
