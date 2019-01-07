import { Directive, Input, ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[sImgLazyLoad]'
})
export class ImgLazyLoadDirective {

  /**
   * 1:262-185
   * 2:640-320
   * 3:640-360
   * 4:800-800
   */
  private _sizeType: string = '1';

  @Input() set sizeType(sizeType: string) {
    this._sizeType = sizeType;
  }
  get sizeType() {
    return this._sizeType;
  }

  @Input('sImgLazyLoad') src: string;


  constructor(public element: ElementRef, public renderer: Renderer) {
    // console.log('Hello ImgLazyLoadDirective Directive');
  }

  ngOnInit() {
    switch (this.sizeType) {
      case '1':
        this.setSrc('./assets/icons/262-185.jpg'); break;
      case '2':
        this.setSrc('./assets/icons/640-320.jpg'); break;
      case '3':
        this.setSrc('./assets/icons/640-360.jpg'); break;
      case '4':
        this.setSrc('./assets/icons/800-800.jpg'); break;
      default:
        this.setSrc('./assets/icons/262-185.jpg'); break;
    }
  }
  ngOnChanges() {
    let img = new Image();
    img.src = this.src;
    img.onload = () => {
      this.setSrc(this.src);
    }
    img.onerror = () => {
      switch (this.sizeType) {
        case '1':
          this.setSrc('./assets/icons/262-185-err.jpg'); break;
        case '2':
          this.setSrc('./assets/icons/640-320-err.jpg'); break;
        case '3':
          this.setSrc('./assets/icons/640-360-err.jpg'); break;
        case '4':
          this.setSrc('./assets/icons/800-800-err.jpg'); break;
        default:
          this.setSrc('./assets/icons/262-185-err.jpg'); break;
      }
    }
  }

  private setSrc(src: string) {
    this.renderer.setElementProperty(this.element.nativeElement, 'src', src);
    // this.renderer.setElementAttribute(this.element.nativeElement, 'src', src);
  }

}
