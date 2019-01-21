import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgLazyLoadDirective } from './img-lazy-load/img-lazy-load.directive';
import { GetImageDirective } from './get-image/get-image.directive';
import { PreviewImagesDirective } from './preview-images/preview-images.directive';

@NgModule({
  declarations: [
    ImgLazyLoadDirective,
    GetImageDirective,
    PreviewImagesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImgLazyLoadDirective,
    GetImageDirective,
    PreviewImagesDirective
  ]
})
export class DirectivesModule { }
