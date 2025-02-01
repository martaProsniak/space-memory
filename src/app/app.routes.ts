import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {path: 'game', title: 'Space Memory | GameModel', loadComponent: () => import('./game/game.component').then(m => m.GameComponent)},
  {path: '', title: 'Space Memory', component: HomeComponent},
];
