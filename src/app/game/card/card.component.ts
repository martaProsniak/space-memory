import {Component, Input} from '@angular/core';
import {Card} from '../types';

@Component({
  selector: 'card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() card!: Card;
  @Input() index!: number;
}
