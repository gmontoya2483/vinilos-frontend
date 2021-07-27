import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewImagePipe } from './pipes/new-image.pipe';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';



@NgModule({
  declarations: [NewImagePipe, TruncateTextPipe],
  imports: [
    CommonModule
  ],
  exports: [NewImagePipe, TruncateTextPipe]
})
export class SharedModule { }
