import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { PopoversService } from 'src/app/providers/popovers/popovers.service';
import { NavController, NavParams, ModalController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { HttpDataService } from 'src/app/providers/http-data.service';

@Component({
  selector: 's-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  frontCamera: boolean;
  light: boolean;
  isShow: boolean;
  modal: ModalController;

  constructor(
    private qrScanner: QRScanner,
    private popoversServ: PopoversService,
    private ib: InAppBrowser,
    private httpServ: HttpDataService,
    private navParams: NavParams,
    private navCtrl: NavController
  ) {
    this.light = false;
    this.frontCamera = false;
    this.isShow = true;
  }

  ngOnInit(): void {
    this.modal = this.navParams.data.modal;
  }

  closeModel() {
    // let scandata = 'https://m.jingku.cn/#/nav/n4/tabs/tabs/t0/my/account-process/975485604086'//897548954086
    this.modal.dismiss().then(res => {
      // this.parsing(scandata)
    });
  }

  ionViewDidEnter() {
    (window.document.body as HTMLElement).classList.add('cameraView');
    // Optionally request the permission early
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          this.qrScanner.show().then(() => {
            (window.document.body as HTMLElement).classList.add('cameraView');
          });
          // camera permission was granted
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe((scandata) => {
            // this.popoversServ.presentToast(scandata);
            scanSub.unsubscribe(); // stop scanning
            // this.qrScanner.destroy(); // hide camera preview
            this.modal.dismiss({
              scandata: scandata
            }).then((res) => {
              this.parsing(scandata);
            });
          })
        } else if (status.denied) {
          this.popoversServ.presentToast('没有相机访问权限');
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  parsing(scandata) {
    try {
      let data = decodeURIComponent(scandata);
      let domain = data.split('/')[2];
      if (data.indexOf('account-process') > -1) {//加工单绑定编码

        let sn = data.split('/')[data.split('/').length - 1];//'https://m.jingku.cn/#/nav/n4/tabs/tabs/t0/my/account-process/897548954086'
        this.httpServ.barcodeBarCodeInfo({ sn: sn }).subscribe(res => {
          if (res.status == 1) {
            if (res.data.type === '0') {//来镜加工

              if (res.data.target_id > 0) {//条码已被绑定跳对应详情
                this.popoversServ.presentToast('该条码已被绑定');
                this.navCtrl.navigateForward(['/manage/mirror-process/info', res.data.target_id]);
              } else {//去绑定编码
                this.navCtrl.navigateForward(['/manage/mirror-process', { sn: sn }]);
              }
            } else if (res.data.type === '1') {//退换货
              if (res.data.target_id > 0) {//条码已被绑定跳对应详情
                this.navCtrl.navigateForward(['/manage/returns/info', res.data.target_id]);
              } else {//去绑定编码
                this.popoversServ.presentToast('供货商退换货不需要绑定');
              }
            }
          }
        })
      } else {
        this.ib.create(scandata, '_system');
      }
    } catch (error) {
      this.ib.create(scandata, '_system');
    }
  }

  ngOnDestroy() {
    this.qrScanner.destroy();//需要关闭扫描，否则相机一直开着
  }
  ionViewWillLeave() {
    (window.document.body as HTMLElement).classList.remove('cameraView');
    return true;
  }
  /**
   * 闪光灯控制，默认关闭
   */
  toggleLight() {
    if (this.light) {
      this.qrScanner.disableLight();
    } else {
      this.qrScanner.enableLight();
    }
    this.light = !this.light;
  }

  /**
   * 前后摄像头互换
   */
  toggleCamera() {
    if (this.frontCamera) {
      this.qrScanner.useBackCamera();
    } else {
      this.qrScanner.useFrontCamera();
    }
    this.frontCamera = !this.frontCamera;
  }

}
