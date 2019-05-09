import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Funko } from 'src/app/shared/model/funko.model';
import { Rarity } from 'src/app/shared/model/rarity.enum';
import { Exclusivity } from '../shared/model/exclusivity.enum';

@Component({
  selector: 'funko-add-modify',
  templateUrl: './add-modify.component.html',
  styleUrls: ['./add-modify.component.scss']
})
export class AddModifyComponent implements OnInit {
  funko: Funko;
  modifyForm: FormGroup;

  rarities: string[];
  exclusivities: string[];
  constructor(
    public dialogRef: MatDialogRef<AddModifyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.rarities = Object.values(Rarity);
    this.exclusivities = Object.values(Exclusivity);
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
      rarity: [this.funko.rarity],
      toBase64: [false]
    });
  }

  close() {
    if (this.modifyForm.get('toBase64').value) {
      // let reader = new FileReader();
      // reader.onloadend = () => {
      //   console.log(reader.result);
      // };
      // reader.readAsDataURL(this.modifyForm.get('picture').value);
    }

    this.dialogRef.close({ ...this.modifyForm.value });
  }
}
