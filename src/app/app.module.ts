import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddModifyComponent } from './add-modify/add-modify.component';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { SharedModule } from './shared/shared.module';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [AppComponent, CardComponent, UploadComponent, AddModifyComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, ReactiveFormsModule, SharedModule],
  entryComponents: [UploadComponent, AddModifyComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
