import {Component, Signal} from '@angular/core';
import {GameService} from './game.service';
import {Card} from './types';
import {NgForOf} from '@angular/common';
import {ActionsComponent} from './actions/actions.component';
import {ProgressComponent} from './progress/progress.component';
import {CardComponent} from './card/card.component';
import {GameHeaderComponent} from './game-header/game-header.component';
import {StartGameBtnComponent} from './start-game-btn/start-game-btn.component';

@Component({
  selector: 'app-game',
  imports: [
    ActionsComponent,
    ProgressComponent,
    CardComponent,
    GameHeaderComponent,
    StartGameBtnComponent,
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
}
