import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {path: 'game', title: 'Space Memory | Game', loadComponent: () => import('./game/game.component').then(m => m.GameComponent)},
  {path: 'credits', title: 'Space Memory | Credits', loadComponent: () => import('./credits/credits.component').then(m => m.CreditsComponent)},
  {path: '', title: 'Space Memory', component: HomeComponent},
];
