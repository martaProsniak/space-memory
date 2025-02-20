import {Component, Input} from '@angular/core';
import {Card} from '../types';
import {NgForOf} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  animations: [
    trigger('visibleHidden', [
      state('visible', style({opacity: 1, transform: 'scale(1) rotate(0)'})),
      state('hidden', style({opacity: 0, transform: 'scale(0.5) rotate(15deg)'})),
      transition('visible => hidden', animate('0.5s ease-out')),
    ]),
    trigger('flippedCard', [
      state('face', style({backgroundColor: '#1a1d25'})),
      state('back', style({backgroundColor: 'rgb(114 226 239)'})),
      transition('back <=> face', animate('0.3s ease-in-out')),
    ])
  ]
})
export class CardComponent {
  @Input() card!: Card;
  @Input() index!: number;
}
