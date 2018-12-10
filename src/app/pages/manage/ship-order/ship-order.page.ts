import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';

@Component({
  selector: 's-ship-order',
  templateUrl: './ship-order.page.html',
  styleUrls: ['./ship-order.page.scss'],
})
export class ShipOrderPage implements OnInit {
  data: any;

  constructor(
    public httpServ: HttpDataService,
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.httpServ.delivery_list().subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
      }
    })
  }
}
