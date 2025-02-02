import {Component, Signal, WritableSignal} from '@angular/core';
import {GameService} from './game.service';
import {Card} from './types';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [
    NgForOf,
    NgIf,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  deck: Signal<Card[]>;
  progress;

  constructor(private gameService: GameService) {
    this.deck = this.gameService.getDeck();
    this.progress = this.gameService.getProgress();
  }

  flipCard(card: Card) {
    this.gameService.flipCard(card);
  }

  restartGame() {
    this.gameService.startNewGame();
  }
}
