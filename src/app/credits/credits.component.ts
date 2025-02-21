import { Component } from '@angular/core';
import {GameHeaderComponent} from '../game/game-header/game-header.component';

@Component({
  selector: 'app-credits',
  imports: [
    GameHeaderComponent
  ],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css'
})
export class CreditsComponent {

}
