import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonContent } from '@ionic/angular';
import { HttpDataService } from 'src/app/providers/http-data.service';

@Component({
  selector: 's-returns',
  templateUrl: './returns.page.html',
  styleUrls: ['./returns.page.scss'],
})
export class ReturnsPage implements OnInit {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonContent) content: IonContent;
  data: any;
  orderList: any;

  constructor(
    public httpServ: HttpDataService,
  ) { }

  ngOnInit() {
    this.httpServ.returnsIndex().subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
        this.orderList = this.data.list;
      }
    })
  }

  doRefresh(event) {
    this.httpServ.returnsIndex({
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
      this.httpServ.returnsIndex({
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
}
