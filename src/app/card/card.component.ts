import { Component, Input, OnInit } from '@angular/core';
import { Funko } from '../shared/model/funko.model';

@Component({
  selector: 'funko-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  funko: Funko;

  constructor() {}

  ngOnInit() {}
}
