import { Component, OnInit } from '@angular/core';
import { AlertOptions } from '@ionic/core';
import { NavController, Events } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpDataService } from 'src/app/providers/http-data.service';

@Component({
  selector: 's-revise-contract',
  templateUrl: './revise-contract.page.html',
  styleUrls: ['./revise-contract.page.scss'],
})
export class ReviseContractPage implements OnInit {

  customAlertOptions: AlertOptions = {
    header: '请选择',
    translucent: true
  };
  contracttime: string;
  endtime: string;
  task_amount: string;
  is_xianxia: string;
  id: string;
  minDate: string;
  maxDate: string;

  constructor(
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public httpServ: HttpDataService,
    public events: Events,
  ) {
    let d = new Date();
    this.minDate = d.getFullYear() + '';
    this.maxDate = d.getFullYear() + 3 + '';

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
  }
  cancel() {
    this.navCtrl.back();
  }
  confirm() {
    this.httpServ.subcontract({
      id: this.id,
      contracttime: this.contracttime,
      task_amount: this.task_amount,
      endtime: this.endtime,
      is_xianxia: this.is_xianxia
    }).subscribe(res => {
      if (res.status == 1) {
        this.navCtrl.back();
      }
    })
  }
}
