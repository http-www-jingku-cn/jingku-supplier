import { Component, OnInit } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoversService } from 'src/app/providers/popovers/popovers.service';
import { Events } from '@ionic/angular';

@Component({
  selector: 's-mirror-process-info',
  templateUrl: './mirror-process-info.page.html',
  styleUrls: ['./mirror-process-info.page.scss'],
})
export class MirrorProcessInfoPage implements OnInit {
  orderId: string;
  data: any;

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
    this.httpServ.machiningInfo({ id: this.orderId }).subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
      }
    })
  }
}
