
import { Directive, Input, HostListener } from '@angular/core';

import previewImage from 'src/assets/plugins/previewImage.min';

@Directive({
  selector: '[sPreviewImages]'
})
export class PreviewImagesDirective {

  @Input('sPreviewImages') imgs: Array<string>;
  @Input() index: number = 0;

  constructor() {
  }

  @HostListener('click', ['$event']) onclick(e) {
    var obj = {
      urls: this.imgs,
      current: this.imgs[this.index]
    };
    previewImage.start(obj);
  }
}
