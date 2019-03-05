import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { PopoversService } from 'src/app/providers/popovers/popovers.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 's-returns-info',
  templateUrl: './returns-info.page.html',
  styleUrls: ['./returns-info.page.scss'],
})
export class ReturnsInfoPage implements OnInit {

  orderId: string;
  data: any;
  returnState: any;
  returnType: any;

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
    public router: Router,
    public popoversServ: PopoversService,
    public events: Events,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.orderId = params.get('id');
      this.getData();
    });
  }

  getData() {
    this.httpServ.returnsInfo({ id: this.orderId }).subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
        this.returnState = this.data.info.return_status;
        this.returnType = this.data.info.return_type;
      }
    })
  }
}
