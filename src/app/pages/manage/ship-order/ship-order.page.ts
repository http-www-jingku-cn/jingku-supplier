import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 's-ship-order',
  templateUrl: './ship-order.page.html',
  styleUrls: ['./ship-order.page.scss'],
})
export class ShipOrderPage implements OnInit {
  data: any;
  orderId: string;

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('order_id');
      this.getData();
    });
  }

  getData() {
    this.httpServ.delivery_list({
      id: this.orderId
    }).subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
      }
    })
  }
}
