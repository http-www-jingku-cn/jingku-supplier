import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 's-logistics-tracking',
  templateUrl: './logistics-tracking.page.html',
  styleUrls: ['./logistics-tracking.page.scss'],
})
export class LogisticsTrackingPage implements OnInit {
  orderId: string;
  data: any;
  is_delivery: boolean;

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id');
      this.is_delivery = params.get('is_delivery') == '1';
      this.getData();
    });
  }

  getData() {
    let params;
    if (this.is_delivery) {
      params = { did: this.orderId };
    } else {
      params = { id: this.orderId };
    }
    this.httpServ.order_shipping(params).subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
      } else {
        this.data = [];
      }
    })
  }
}
