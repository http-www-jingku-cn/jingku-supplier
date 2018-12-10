import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, timer, from, zip } from 'rxjs';
import { take, map, mergeMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.page.html',
  styleUrls: ['./order-info.page.scss'],
})
export class OrderInfoPage implements OnInit {
  data: any;
  orderId: string;
  orderStatus: any;

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
    public router: Router,
    public storage: Storage,
  ) {
    /* interval(1000).pipe(
      take(10),
      map(n => n * 2)
    ).subscribe(res => {
      console.log(res)
    }) */
    /* interval(1000).pipe(
      take(10),
      mergeMap(n => timer(500).pipe(
        map(() => n)
      ))
    ).subscribe(res => {
      console.log(res)
    }) */

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.orderId = params.get('id');
      this.orderStatus = params.get('order_status');
      this.getData(params.get('id'));
    });
  }

  getData(id) {
    this.httpServ.orderInfo({ id: id }).subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
      }
    })
  }

}
