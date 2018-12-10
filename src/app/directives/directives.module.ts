import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgLazyLoadDirective } from './img-lazy-load/img-lazy-load.directive';
import { GetImageDirective } from './get-image/get-image.directive';

@NgModule({
  declarations: [
    ImgLazyLoadDirective,
    GetImageDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImgLazyLoadDirective,
    GetImageDirective
  ]
})
export class DirectivesModule { }
