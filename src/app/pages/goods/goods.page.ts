import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { NavController, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.page.html',
  styleUrls: ['./goods.page.scss'],
})
export class GoodsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  data: any;
  goodsList: any;

  constructor(
    public navCtrl: NavController,
    public httpServ: HttpDataService,
  ) { }

  ngOnInit() {
    this.httpServ.goodsList().subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
        this.goodsList = this.data.list;
      }
    })
  }

  doRefresh(event) {
    this.httpServ.goodsList({
      page: 1,
      size: 20
    }, { showLoading: false }).subscribe(res => {
      this.infiniteScroll.disabled = false;
      if (res.status == 1) {
        this.data = res.data;
        this.goodsList = this.data.list;
        event.target.complete();
      }
    })
  }
  loadData(event) {
    if (this.data && this.data.page < this.data.lastPage) {
      this.httpServ.goodsList({
        page: ++this.data.page,
        size: 20
      }, { showLoading: false }).subscribe(res => {
        this.infiniteScroll.complete();
        if (res.status == 1) {
          this.data = res.data;
          this.goodsList = [...this.goodsList, ...res.data.list];
        }
      })
    } else {
      this.infiniteScroll.disabled = true;
    }
  }

}
