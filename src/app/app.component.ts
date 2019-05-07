import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Funko } from './shared/model/funko.model';
import { UtilsService } from './shared/service/utils.service';
import { UploadComponent } from './upload/upload.component';

@Component({
  selector: 'funko-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  funkoList: Funko[];
  dragState = false;

  constructor(private http: HttpClient, private dialog: MatDialog, private utils: UtilsService) {}

  ngOnInit(): void {}

  openUploadForm(): void {
    const dialogRef = this.dialog.open(UploadComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  downloadJson() {
    this.utils.saveAs(JSON.stringify(this.funkoList));
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
