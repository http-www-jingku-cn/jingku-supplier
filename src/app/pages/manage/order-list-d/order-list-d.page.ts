import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, NavController, Events } from '@ionic/angular';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { PopoversService } from 'src/app/providers/popovers/popovers.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { StartupService } from 'src/app/providers/startup.service';

@Component({
  selector: 'app-order-list-d',
  templateUrl: './order-list-d.page.html',
  styleUrls: ['./order-list-d.page.scss'],
})
export class OrderListDPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  data: any;
  orderList;
  pageIndex: number = 0;
  distribution_status: any;

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public events: Events,
    public popoversServ: PopoversService,
    public ib: InAppBrowser,
    public startup: StartupService,
  ) {
  }

  ngOnInit() {
    this.events.subscribe('order-list-d:refresh', () => {
      this.getData();
    })
    this.route.paramMap.subscribe(params => {
      this.pageIndex = +params.get('pageindex');
      this.getData();
    });
  }
  ngOnDestroy() {
    this.events.unsubscribe('order-list-d:refresh');
  }
  getData() {
    this.orderList = [];
    switch (this.pageIndex) {
      case 0:
        this.distribution_status = 1;
        break;
      case 1:
        this.distribution_status = 2;
        break;
      case 2:
        this.distribution_status = 3;
        break;
      case 3:
        this.distribution_status = 4;
        break;
      default:
        this.distribution_status = 1;
        break;
    }
    this.httpServ.orderList({
      distribution_status: this.distribution_status,
      size: 20,
      page: 1,
      code: 'distribution'
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
      distribution_status: this.distribution_status,
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
  loadData(event) {
    if (this.data && this.data.page < this.data.lastPage) {
      this.httpServ.orderList({
        distribution_status: this.distribution_status,
        page: ++this.data.page,
        code: 'distribution',
        size: 20
      }, { showLoading: false }).subscribe(res => {
        this.infiniteScroll.complete();
        if (res.status == 1) {
          this.data = res.data;
          this.orderList = [...this.orderList, ...res.data.list];
        }
      })
    } else {
      this.infiniteScroll.disabled = true;
    }
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
  refuse(order) {
    this.httpServ.ordercancel({
      id: order.id
    }).subscribe(res => {
      if (res.status == 1) {
        this.popoversServ.presentToast(res.info);
        order.operable_list.refuse = false;
        this.getData();
      }
    })
  }
  check(id) {
    this.httpServ.orderagree({ id: id }, { showToast: false }).subscribe(res => {
      if (res.code == '0010') {
        this.navCtrl.navigateForward(['/manage/revise-contract', id]);
      } else if (res.status == 1) {
        this.popoversServ.presentToast(res.info);
        this.getData();
      }
    })
  }
  seal(id) {
    this.httpServ.sealindex({
      id: id
    }).subscribe(res => {
      if (res.status == 1) {
        this.navCtrl.navigateForward(['/iframe-browser', {
          url: res.data.url,
          title: '合同详情',
        }])
      }
    })
  }
  look(id) {
    this.httpServ.infourlseal({
      id: id
    }).subscribe(res => {
      if (res.status == 1) {
        this.navCtrl.navigateForward(['/iframe-browser', {
          url: res.data.url,
          title: '合同详情',
        }])
      }
    })
  }
  sign(id) {
    this.httpServ.sealinfo({
      id: id
    }).subscribe(res => {
      if (res.status == 1) {
        this.navCtrl.navigateForward(['/iframe-browser', {
          url: res.data.url,
          title: '合同详情',
        }])
      }
    })
  }
  download(id) {
    let url = 'http://price.jingkoo.net/public/scrm/Seal/downloadPdf?id=' + id + '&token=' + this.startup.token;
    this.ib.create(url, '_system');
    /* this.httpServ.downloadpdf({
      id: id
    }).subscribe(res => {
      if (res.status == 1) {
        this.ib.create(res.data.url, '_system');
      }
    }) */
  }
  opc_order(order) {
    this.httpServ.opc_order({
      id: order.id
    }).subscribe(res => {
      if (res.status == 1) {
        this.popoversServ.presentToast(res.info);
        order.operable_list.opc = false;
        this.getData();
      }
    })
  }
}
