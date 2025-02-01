import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  ngOnInit() {
    console.log('Game Component');
  }
}
