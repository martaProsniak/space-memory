import {Component, OnInit} from '@angular/core';
import {GameService} from './game.service';
import {Card} from './types';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [
    NgForOf,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  deck: Card[] = [];

  constructor(private gameService: GameService) {
    this.deck = this.gameService.getDeck();
    console.log(this.deck);
  }

  ngOnInit() {
    console.log('GameModel Component');
  }
}
