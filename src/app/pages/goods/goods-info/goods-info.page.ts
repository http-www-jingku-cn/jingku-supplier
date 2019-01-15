import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { ActivatedRoute } from '@angular/router';
import { PopoversService } from 'src/app/providers/popovers/popovers.service';

@Component({
  selector: 's-goods-info',
  templateUrl: './goods-info.page.html',
  styleUrls: ['./goods-info.page.scss'],
})
export class GoodsInfoPage implements OnInit {
  goodsId: string;
  data: any;
  slideOpts = {};

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
    public popoversServ: PopoversService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.goodsId = params.get('id');
      this.getInfo();
    });
  }
  getInfo() {
    this.httpServ.goodsInfo({ id: this.goodsId }).subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
      }
    })
  }
  goodsOnSale() {
    this.httpServ.goods_on_sale({ id: this.goodsId }).subscribe(res => {
      if (res.status == 1) {
        this.popoversServ.presentToast(res.info);
        this.getInfo();
      }
    })
  }
}
