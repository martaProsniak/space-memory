import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {GameHeaderComponent} from '../game/game-header/game-header.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    GameHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  texts = [
    'A long time ago in a galaxy far far away...',
    'A young, brave adventurer started his cosmic journey.',
    'Suddenly... He was attacked by the aliens!',
    'Now he must rush through their attack line and escape...',
    'He must shoot two the same targets at once to break one line.',
    'Would you help him?'
  ]

}
