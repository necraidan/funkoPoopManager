import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormatTagsPipe } from './pipe/format-tags.pipe';

@NgModule({
  declarations: [FormatTagsPipe],
  imports: [CommonModule, MaterialModule],
  exports: [MaterialModule, FormatTagsPipe]
})
export class SharedModule {}
