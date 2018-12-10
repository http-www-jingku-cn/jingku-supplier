import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-list-d',
  templateUrl: './order-list-d.page.html',
  styleUrls: ['./order-list-d.page.scss'],
})
export class OrderListDPage implements OnInit {

  constructor(
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(res=>{
      console.log(res)
    });
  }

}
