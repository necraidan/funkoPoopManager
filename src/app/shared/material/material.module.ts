// import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [MatToolbarModule, MatCardModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatChipsModule],
  exports: [MatToolbarModule, MatCardModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatChipsModule]
})
export class MaterialModule {}
