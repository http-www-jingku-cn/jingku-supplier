import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { ActivatedRoute } from '@angular/router';
import { PopoversService } from 'src/app/providers/popovers/popovers.service';
import { Events, NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { baseurl } from 'src/app/providers/default.interceptor';
import { Storage } from '@ionic/storage';
import { StartupService } from 'src/app/providers/startup.service';

@Component({
  selector: 'app-order-info-d',
  templateUrl: './order-info-d.page.html',
  styleUrls: ['./order-info-d.page.scss'],
})
export class OrderInfoDPage implements OnInit {

  data: any;
  orderId: string;
  orderStatus: any;

  constructor(
    public route: ActivatedRoute,
    public events: Events,
    public popoversServ: PopoversService,
    public httpServ: HttpDataService,
    public ib: InAppBrowser,
    public navCtrl: NavController,
    public storage: Storage,
    public startup: StartupService,
  ) {

  }

  ngOnInit() {
    this.events.subscribe('order-info-d:refresh', () => {
      this.getData();
    })
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id');
      this.orderStatus = params.get('order_status');
      this.getData();
    });
  }

  ngOnDestroy() {
    this.events.unsubscribe('order-info-d:refresh');
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
        this.events.publish('order-list-d:refresh');
        this.events.publish('order-info-d:refresh');
      }
    })
  }
  refuse() {
    this.httpServ.ordercancel({
      id: this.orderId
    }).subscribe(res => {
      if (res.status == 1) {
        this.popoversServ.presentToast(res.info);
        this.events.publish('order-list-d:refresh');
        this.data.operable_list.refuse = false;
      }
    })
  }
  check(id) {
    this.httpServ.orderagree({ id: id }).subscribe(res => {
      if (res.code = '0010') {
        this.navCtrl.navigateForward(['/manage/revise-contract', id]);
      } else
        if (res.status == 1) {
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
    let url = 'http://price.jingkoo.net/public/scrm/publics/downloadPdf?order_id=' + id + '&token=' + this.startup.token;
    this.ib.create(url, '_system');
    /* this.httpServ.downloadpdf({
      id: id
    }).subscribe(res => {
      if (res.status == 1) {
        this.ib.create(res.data.url, '_system');
      }
    }) */
  }
  opc_order() {
    this.httpServ.opc_order({
      id: this.orderId
    }).subscribe(res => {
      if (res.status == 1) {
        this.popoversServ.presentToast(res.info);
        this.events.publish('order-list-d:refresh');
        this.data.operable_list.opc = false;
      }
    })
  }
}
