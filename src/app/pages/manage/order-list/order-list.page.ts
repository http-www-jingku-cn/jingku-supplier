import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { IonInfiniteScroll, Events } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NativeService } from 'src/app/providers/native/native.service';
import { PopoversService } from 'src/app/providers/popovers/popovers.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  data: any;
  orderList;
  pageIndex: number = 0;
  composite_status: any;

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
    public native: NativeService,
    public popoversServ: PopoversService,
    public events: Events,
  ) {
  }

  ngOnInit() {
    this.events.subscribe('order-list:refresh', () => {
      this.getData();
    })
    this.route.paramMap.subscribe(params => {
      this.pageIndex = +params.get('pageindex');
      this.getData();
    });
  }
  ngOnDestroy() {
    this.events.unsubscribe('order-list:refresh');
  }
  getData() {
    this.orderList = [];
    switch (this.pageIndex) {
      case 0:
        this.composite_status = 100;//待支付
        break;
      case 1:
        this.composite_status = 101;//待发货
        break;
      case 2:
        this.composite_status = 104;//部分发货
        break;
      case 3:
        this.composite_status = 105;//待收货
        break;
      case 4:
        this.composite_status = 102;//已完成
        break;
      case 5:
        this.composite_status = 2;//已取消
        break;
      default:
        this.composite_status = 102;
        break;
    }
    this.httpServ.orderList({
      composite_status: this.composite_status,
      page: 1,
      size: 20
    }).subscribe(res => {
      this.infiniteScroll.disabled = false;
      if (res.status == 1) {
        this.data = res.data;
        this.orderList = this.data.list;
      }
    })
  }
  doRefresh(event) {
    this.httpServ.orderList({
      composite_status: this.composite_status,
      page: 1,
      size: 20
    }, { showLoading: false }).subscribe(res => {
      this.infiniteScroll.disabled = false;
      if (res.status == 1) {
        this.data = res.data;
        this.orderList = this.data.list;
        event.target.complete();
      }
    })
  }
  segmentChanged(index) {
    this.pageIndex = index;
    this.getData();
  }
  prepare(order) {
    this.httpServ.prepare({
      id: order.id
    }).subscribe(res => {
      if (res.status == 1) {
        this.popoversServ.presentToast(res.info);
        order.operable_list.prepare = false;
      }
    })
  }
  loadData(event) {
    if (this.data && this.data.page < this.data.lastPage) {
      this.httpServ.orderList({
        composite_status: this.composite_status,
        page: ++this.data.page,
        size: 20
      }, { showLoading: false }).subscribe(res => {
        event.target.complete();
        if (res.status == 1) {
          this.data = res.data;
          this.orderList = [...this.orderList, ...res.data.list]
        }
      })
    } else {
      event.target.disabled = true;
    }
  }

}
