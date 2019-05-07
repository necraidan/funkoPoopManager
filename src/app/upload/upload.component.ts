import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'funko-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UploadComponent>) {}

  file: any;
  fileInformation: any;

  uploadForm: FormGroup;

  ngOnInit() {
    this.uploadForm = new FormGroup({
      file: new FormControl('')
    });
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.fileInformation = null;
      console.log(this.file);
      const fileReader = new FileReader();
      fileReader.onload = e => {
        console.log(fileReader.result);
      };

      fileReader.readAsText(this.file);
    }
  }

  sendFile() {
    const data: FormData = new FormData();
    data.append(`data`, this.file, this.file.name);
    console.log(data);
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
