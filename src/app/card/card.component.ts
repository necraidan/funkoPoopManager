import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddModifyComponent } from '../add-modify/add-modify.component';
import { Funko } from '../shared/model/funko.model';

@Component({
  selector: 'funko-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input()
  funko: Funko;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  modify() {
    const dialogRef = this.dialog.open(AddModifyComponent, { minWidth: '60vw', data: { funko: this.funko } });

    dialogRef.afterClosed().subscribe(result => {
      // tslint:disable-next-line: no-unused-expression
      result && Object.assign(this.funko, result);
    });
  }
}
