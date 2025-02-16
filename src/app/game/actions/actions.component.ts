import {Component, OnInit} from '@angular/core';
import {GameService} from '../game.service';
import {PairsCount} from '../types';
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
  pairsCount: PairsCount

  constructor(private gameService: GameService) {
    this.pairsCount = this.gameService.getPairsCount();
  }

  ngOnInit() {
    const pairCount = localStorage.getItem('pairs-count');
    if (!pairCount) {
      return;
    }
    this.pairsCount = Number(pairCount) as PairsCount;
    this.gameService.setPairsCount(this.pairsCount);
  }

  restartGame() {
    this.gameService.startNewGame();
  }

  handleChange() {
    this.gameService.setPairsCount(this.pairsCount);
    localStorage.setItem('pairs-count', `${this.pairsCount}`);
  }
}
