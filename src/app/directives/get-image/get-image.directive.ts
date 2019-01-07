import { Directive, Output, Input, HostListener, EventEmitter } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { ActionSheetController, ModalController, Platform } from '@ionic/angular';
import { PopoversService } from 'src/app/providers/popovers/popovers.service';

@Directive({
  selector: '[sGetImage]'
})
export class GetImageDirective {
  constructor(
    private httpServ: HttpDataService,
    public actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController,
    private platform: Platform,
    private popoversServ: PopoversService,
  ) {
    console.log('Hello GetImageDirective Directive');
  }
  @Output('sGetImage') fileChecked: EventEmitter<any> = new EventEmitter<any>();
  @Input() quality: number;
  @Input('CameraOptions') cameraOptions: CameraOptions = new Object();

  @HostListener('click', ['$event']) onclick(e) {
    /* if (this.platform.is('cordova')) {
      e.preventDefault()
    } */
  }
  @HostListener('change', ['$event']) onchange(e) {
    if (!e) { return; }
    let file = e.target.files[0];//获取文件
    let imageType = /^image\//;
    e.target.value = null;//选择成功后清空input值
    if (!imageType.test(file.type)) {//判断图片
      this.popoversServ.presentToast("请选择图片！");
    } else
      if (file.size > (15 * 1024 * 1024)) {
        this.popoversServ.presentToast("图片超过限制");
      } else {
        let reader = new FileReader();
        reader.onload = (event) => {//读取完成
          let base = event.target['result'];
          this.httpServ.getFileImg({ img: base }).subscribe(res => {
            if (res.status == 1) {
              this.fileChecked.emit({
                img_http: res.data.img_http,
                img_url: res.data.img_url,
                base64: base
              });
            }
          })
        };
        reader.readAsDataURL(file);
      }
  }
  dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(',')[1]);
    let mimeString = dataURI.split(',')[0].match(/:(.*?);/)[1];
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    let blob = new Blob([ia], { type: mimeString });
    return blob;
  }
  dealImage(path: string, callback, obj: { width?: number, height?: number, quality?: number } = {}) {
    let img = new Image();
    img.src = path;
    img.onload = function () {
      // 默认按比例压缩
      let w = img.width,
        h = img.height,
        scale = w / h;
      w = obj.width || w;
      h = obj.height || (w / scale);
      let quality = 0.9;  // 默认图片质量为0.9
      //生成canvas
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      // 创建属性节点
      let anw = document.createAttribute("width");
      anw.nodeValue = String(w);
      let anh = document.createAttribute("height");
      anh.nodeValue = String(h);
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(img, 0, 0, w, h);
      // 图像质量
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = 0.9;
      }
      // quality值越小，所绘制出的图像越模糊
      let base64 = canvas.toDataURL('image/jpeg', quality);
      // 回调函数返回base64的值
      callback(base64);
    }
  }

}
