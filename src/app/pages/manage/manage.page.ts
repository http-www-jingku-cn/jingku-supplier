import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { HttpDataService } from 'src/app/providers/http-data.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {
  counts: any;
  supplierInfo: any;

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public httpServ: HttpDataService,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(res => {
      console.log(res)
    });
    this.getOrderNum();
    this.getSupplierInfo();
  }

  getOrderNum() {
    this.httpServ.order_num({}, { showLoading: true }).subscribe(res => {
      if (res.status == 1) {
        this.counts = res.data;
      }
    })
  }
  goOrderListPage() {
    this.navCtrl.navigateForward('manage/orderList')
    // console.log(this.router, this.route)
    // this.router.navigateByUrl('app/tabs/(manage:orderList)')
  }
  getSupplierInfo() {
    this.httpServ.supplierInfo({}, { showLoading: false }).subscribe(res => {
      if (res.status == 1) {
        this.supplierInfo = res.data;
      }
    })
  }

}
