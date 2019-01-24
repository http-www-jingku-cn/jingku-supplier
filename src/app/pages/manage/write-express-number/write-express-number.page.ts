import { Component, OnInit } from '@angular/core';
import { AlertOptions } from '@ionic/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Events } from '@ionic/angular';
import { PopoversService } from 'src/app/providers/popovers/popovers.service';

@Component({
  selector: 's-write-express-number',
  templateUrl: './write-express-number.page.html',
  styleUrls: ['./write-express-number.page.scss'],
})
export class WriteExpressNumberPage implements OnInit {

  customAlertOptions: AlertOptions = {
    header: '请选择物流公司',
    translucent: true
  };
  shippingList: any[] = [];
  orderId: string;
  invoice_no: string;
  shipping_code: string;
  id: string;
  edit: boolean;
  stateFrom: string;

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
    public router: Router,
    public navCtrl: NavController,
    public msgServ: PopoversService,
    public events: Events,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');//发货单ID
      this.orderId = params.get('order_id');
      this.edit = +params.get('edit') == 1;
      this.stateFrom = params.get('from');
      this.invoice_no = params.get('invoice_no');
    });
    this.getkShippingList();
  }

  getkShippingList() {
    this.httpServ.kshipping_list().subscribe(res => {
      if (res.status) {
        let shippingList = res.data;
        for (const key in shippingList) {
          if (shippingList.hasOwnProperty(key)) {
            const ship = shippingList[key];
            this.shippingList.push({ key: key, value: ship });
          }
        }
        setTimeout(() => {
          this.route.paramMap.subscribe(params => {
            this.shipping_code = params.get('shipping_code');
          });
        }, 500);
      }
    })
  }
  inputChange() {
    this.httpServ.shipping_ino_name({
      no: this.invoice_no
    }, { showLoading: false }).subscribe(res => {
      if (res.status == 1) {
        this.shipping_code = Object.keys(res.data)[0];
      }
    })
  }
  cancel() {
    if (this.edit) {
      this.navCtrl.back();
      return;
    }
    this.navCtrl.navigateForward(['/manage/ship-order-info', this.id, { xxx: 'xxx' }]);
  }
  confirm() {
    /* if (!this.invoice_no) {
      this.msgServ.presentToast('请填写发货单号');
      return;
    }
    if (!this.shipping_code) {
      this.msgServ.presentToast('请选择物流公司');
      return;
    } */
    if (this.edit) {
      this.httpServ.updateShippingNo({
        id: this.id,
        shipping_code: this.shipping_code,
        invoice_no: this.invoice_no
      }).subscribe(res => {
        if (res.status == 1) {
          this.events.publish('ship-order-info:refresh');
          this.navCtrl.back();
        }
      })
      return;
    }
    this.httpServ.delivery_ship({
      id: this.id,
      shipping_code: this.shipping_code,
      invoice_no: this.invoice_no
    }).subscribe(res => {
      if (res.status == 1) {
        this.navCtrl.navigateForward(['/manage/ship-order-info', this.id, { xxx: 'xxx' }]);
      }
    })
  }
}
