import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddModifyComponent } from './add-modify/add-modify.component';
import { Funko } from './shared/model/funko.model';
import { UtilsService } from './shared/service/utils.service';

/**
 * TODO:
 * - Search
 * - Multiple Add
 * - Picture and other fields
 */
@Component({
  selector: 'funko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  funkoList: Funko[];
  dragState = false;

  constructor(private http: HttpClient, private dialog: MatDialog, private utils: UtilsService) {}

  ngOnInit(): void {
    this.http.get('assets/funko.json').subscribe((res: Funko[]) => {
      this.funkoList = res;
    });
  }

  openUploadForm(): void {
    const dialogRef = this.dialog.open(AddModifyComponent, {
      data: { funko: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.funkoList.push(result);
    });
  }

  downloadJson() {
    this.utils.saveAs(JSON.stringify(this.funkoList));
  }

  addFunko() {
    // https://serratus.github.io/quaggaJS/
    const dialogRef = this.dialog.open(AddModifyComponent, {
      data: { funko: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.funkoList.push(result);
    });
  }

  dropHandler(ev: DragEvent) {
    console.log(ev);

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    console.log(ev.dataTransfer.items[0].getAsFile());

    const fileReader = new FileReader();
    fileReader.onload = e => {
      this.funkoList = JSON.parse(fileReader.result as string);
    };

    fileReader.readAsText(ev.dataTransfer.items[0].getAsFile());

    this.dragState = false;
  }

  dragOverHandler(ev: Event) {
    // Prevent default behavior (Prevent file from being opened)
    ev.stopPropagation();
    ev.preventDefault();
  }
}
