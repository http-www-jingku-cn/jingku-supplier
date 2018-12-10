import { Component, OnInit } from '@angular/core';
import { AlertOptions } from '@ionic/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
    public router: Router,
    public navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id');
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
      }
    })
  }
  cancel() {
    this.navCtrl.navigateBack(['/manage/order-info', this.orderId], { relativeTo: this.route })
  }
  confirm() {
    this.navCtrl.navigateBack(['/manage/order-info', this.orderId, { order_status: 2 }], { relativeTo: this.route })
  }
}
