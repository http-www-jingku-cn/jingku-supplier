import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, timer, from, zip } from 'rxjs';
import { take, map, mergeMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { send } from 'q';
import { PopoversService } from 'src/app/providers/popovers/popovers.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.page.html',
  styleUrls: ['./order-info.page.scss'],
})
export class OrderInfoPage implements OnInit {
  data: any;
  orderId: string;
  orderStatus: any;
  params: any;

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
    public router: Router,
    public storage: Storage,
    public popoversServ: PopoversService,
    public events: Events,
  ) {
    /* interval(1000).pipe(
      take(10),
      map(n => n * 2)
    ).subscribe(res => {
      console.log(res)
    }) */
    /* interval(1000).pipe(
      take(10),
      mergeMap(n => timer(500).pipe(
        map(() => n)
      ))
    ).subscribe(res => {
      console.log(res)
    }) */

  }

  ngOnInit() {
    this.events.subscribe('order-info:refresh', () => {
      this.getData();
    })
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id');
      this.orderStatus = params.get('order_status');
      this.params = params['params'];
      this.getData();
    });
  }
  ngOnDestroy() {
    this.events.unsubscribe('order-info:refresh');
  }
  getData() {
    this.httpServ.orderInfo({ id: this.orderId }).subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
      }

    })
  }
  prepare() {
    this.httpServ.prepare({
      id: this.orderId
    }).subscribe(res => {
      if (res.status == 1) {
        this.popoversServ.presentToast(res.info);
        this.data.operable_list.prepare = false;
        this.events.publish('order-list:refresh');
        this.events.publish('order-info:refresh');
      }
    })
  }

  getStatusBySet(status: number, array: Array<number>) {
    const statusArr = new Set(array);
    return statusArr.has(status);
  }
  generateInvoice() {
    let send_number = {};
    this.data.goods_list.map(value => {
      if (value.select_number || value.select_number == 0) {
        send_number[value.rec_id] = value.select_number;
      } else {
        let num = value.goods_number - value.send_number;
        num || num == 0 ? send_number[value.rec_id] = num : null;
      }
    })
    this.httpServ.split_order({
      id: this.orderId,
      send_number: send_number
    }).subscribe(res => {
      if (res.status == 1) {

        this.httpServ.orderInfo({ id: this.orderId }, { showLoading: false }).subscribe(res => {
          if (res.status == 1) {
            this.data = res.data;
          }
        })

        this.router.navigate(['/manage/write-express-number', res.data[0], { order_id: this.orderId, from: this.params.from }]);
      }
    })
  }
}
