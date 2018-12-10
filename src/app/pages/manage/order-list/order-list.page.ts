import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { IonInfiniteScroll } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NativeService } from 'src/app/providers/native/native.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.page.html',
  styleUrls: ['./order-list.page.scss'],
})
export class OrderListPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  data: any;
  orderList = [];
  pageIndex = 0;

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
    public native: NativeService,
  ) {
    this.route.paramMap.subscribe(res => {
      console.log(res)
    });
    this.route.queryParamMap.subscribe(params => {
      this.pageIndex = +params.get('pageindex');
    });
  }

  ngOnInit() {
    this.getData()
  }
  getData() {
    this.httpServ.orderList().subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
        this.orderList = this.data.list;
      }
    })
  }

  segmentChanged() {
    this.infiniteScroll.disabled = false;
  }

  loadData(event) {
    if (this.data && this.data.page < this.data.pages) {
      this.httpServ.orderList().subscribe(res => {
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
