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

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id');
      this.getData(this.orderId);
    });
  }

  getData(id) {
    this.httpServ.order_shipping({ id: id }).subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
      }
    })
  }
}
