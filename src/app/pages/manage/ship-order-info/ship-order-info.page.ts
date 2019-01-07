import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, Events } from '@ionic/angular';
import { PopoversService } from 'src/app/providers/popovers/popovers.service';

@Component({
  selector: 's-ship-order-info',
  templateUrl: './ship-order-info.page.html',
  styleUrls: ['./ship-order-info.page.scss'],
})
export class ShipOrderInfoPage implements OnInit {

  data: any;
  delivery_id: string;
  orderStatus: any;

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public events: Events,
    public msgServ: PopoversService,
  ) {

  }

  ngOnInit() {
    this.events.subscribe('ship-order-info:refresh', res => {
      this.getData();
    });
    this.route.paramMap.subscribe(params => {
      this.delivery_id = params.get('id');
      this.getData();
    });
  }

  ngOnDestroy() {
    this.events.unsubscribe('ship-order-info:refresh');
  }

  getData() {
    this.httpServ.delivery_info({ delivery_id: this.delivery_id }).subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
      }
    })
  }

  delete() {
    this.httpServ.delivery_del({ delivery_id: this.data.delivery_info.delivery_id }).subscribe(res => {
      if (res.status == 1) {
        this.msgServ.presentToast(res.info);
        this.events.publish('order-list:refresh');
        this.navCtrl.navigateBack(['/manage/order-info', this.data.delivery_info.order_id]);
      }
    })
  }
  delivery() {
    if (this.data.delivery_info.is_shangm == 1) {
      this.httpServ.delivery_ship({
        id: this.data.delivery_info.delivery_id,
      }).subscribe(res => {
        if (res.status == 1) {
          this.navCtrl.navigateBack(['/manage/order-info', this.data.delivery_info.order_id, { xxx: 'xxx' }]);
        }
      })
    } else {
      if (!this.data.delivery_info.shipping_name || !this.data.delivery_info.invoice_no) {
        this.msgServ.presentToast('请完善物流信息');
        return
      }
      this.httpServ.delivery_ship({
        id: this.data.delivery_info.delivery_id,
        shipping_code: this.data.delivery_info.code,
        invoice_no: this.data.delivery_info.invoice_no
      }).subscribe(res => {
        if (res.status == 1) {
          this.getData();
          this.navCtrl.navigateBack(['/manage/order-info', this.data.delivery_info.order_id, { xxx: 'xxx' }]);
        }
      })
    }
  }

}
