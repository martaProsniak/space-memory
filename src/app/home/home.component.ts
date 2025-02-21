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


}
