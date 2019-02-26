import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { StartupService } from 'src/app/providers/startup.service';
import { ChatService } from 'src/app/providers/webim/chat.service';
import { zip } from 'rxjs';

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
    public navCtrl: NavController,
    public httpServ: HttpDataService,
    public startupServ: StartupService,
    public chatServ: ChatService,
  ) {
    
  }

  ngOnInit() {

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
  doRefresh(event) {
    zip(
      this.httpServ.supplierInfo({}, { showLoading: false }),
      this.httpServ.order_num({}, { showLoading: false }),
    ).subscribe(([res1, res2]) => {
      event.target.complete();
      if (res1.status == 1) {
        this.counts = res2.data;
      }
      if (res2.status == 1) {
        this.supplierInfo = res1.data;
      }
    })

  }
  getSupplierInfo() {
    this.httpServ.supplierInfo({}, { showLoading: false }).subscribe(res => {
      if (res.status == 1) {
        this.supplierInfo = res.data;
      }
    })
  }
}
