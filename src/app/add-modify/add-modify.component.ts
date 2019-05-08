import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Funko } from 'src/app/shared/model/funko.model';
import { Rarity } from 'src/app/shared/model/rarity.enum';

@Component({
  selector: 'funko-add-modify',
  templateUrl: './add-modify.component.html',
  styleUrls: ['./add-modify.component.scss']
})
export class AddModifyComponent implements OnInit {
  funko: Funko;
  modifyForm: FormGroup;

  rarities: string[];
  constructor(public dialogRef: MatDialogRef<AddModifyComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
    this.rarities = Object.values(Rarity);
    console.log(this.rarities);
  }

  ngOnInit() {
    this.funko = this.data.funko;

    this.modifyForm = this.formBuilder.group({
      name: [this.funko.name],
      // autocomplete
      popCategory: [this.funko.popCategory],
      // autocomplete
      category: [this.funko.category],
      // autocomplete
      collection: [this.funko.collection],
      number: [this.funko.number],
      // Picture ? Img base 64 ?
      picture: [this.funko.picture],
      description: [this.funko.description],
      owned: [this.funko.owned],
      rarity: [this.funko.rarity]
    });
  }

  close() {
    this.dialogRef.close({ ...this.modifyForm.value });
  }
}
