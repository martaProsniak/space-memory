import {AfterViewInit, Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {GameHeaderComponent} from '../game/game-header/game-header.component';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    GameHeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  animations: [
    trigger('flyIn', [
      state('hidden', style({transform: 'translateY(100vh)'})),
      state('visible', style({transform: 'translateY(0)'})),
      transition('hidden => visible', animate('2s ease-in-out')),
    ]),
  ]
})
export class HomeComponent implements AfterViewInit {
  animationState = 'hidden';

  ngAfterViewInit() {
    setTimeout(() => {
      this.animationState = 'visible';
    }, 100)
  }
}
