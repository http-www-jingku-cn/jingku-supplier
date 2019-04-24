import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { IonInfiniteScroll, IonContent, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PopoversService } from 'src/app/providers/popovers/popovers.service';

@Component({
  selector: 's-mirror-process',
  templateUrl: './mirror-process.page.html',
  styleUrls: ['./mirror-process.page.scss'],
})
export class MirrorProcessPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;
  data: any;
  orderList: any;
  sn: string;

  constructor(
    public httpServ: HttpDataService,
    public navCtrl: NavController,
    public route: ActivatedRoute,
    private popoversServ: PopoversService,
  ) { }


  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.sn = params.get('sn');
      if (this.sn) {
        this.httpServ.barcodeBarCodeList({ sn: this.sn }).subscribe(res => {
          if (res.status == 1) {
            this.data = res.data;
            this.orderList = this.data.list;
          } else {
            this.navCtrl.pop();
          }
        })
      } else {
        this.httpServ.machiningIndex().subscribe(res => {
          if (res.status == 1) {
            this.data = res.data;
            this.orderList = this.data.list;
          } else {
            this.navCtrl.pop();
          }
        })
      }
    });
    // this.doRefresh(event)
  }

  barcodeBarCodeBinding(id, event) {
    event.stopPropagation()
    this.httpServ.barcodeBarCodeBinding({ sn: this.sn, id: id }).subscribe(res => {
      if (res.status == 1) {
        this.popoversServ.presentToast(res.info);
        this.navCtrl.navigateForward(['/manage/mirror-process/info', id]);
      } else {
        this.navCtrl.pop();
      }
    })
  }

  doRefresh(event) {
    this.httpServ.machiningIndex({
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
      this.httpServ.machiningIndex({
        page: ++this.data.page,
        size: 20
      }, { showLoading: false }).subscribe(res => {
        event.target.complete();
        if (res.status == 1) {
          this.data = res.data;
          this.orderList = [...this.orderList, ...this.data.list]
        }
      })
    } else {
      event.target.disabled = true;
    }
  }
  lookInfo(mid) {
    this.navCtrl.navigateForward(['/manage/mirror-process/info', mid]);
  }
  getData(orderId) {
    this.httpServ.machiningInfo({ id: orderId }).subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
      }
    })
  }
}
