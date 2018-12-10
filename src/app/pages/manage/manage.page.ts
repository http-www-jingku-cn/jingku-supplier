import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public navCtrl: NavController,

  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(res=>{
      console.log(res)
    });
  }

  goOrderListPage() {
    this.navCtrl.navigateForward('manage/orderList')
    // console.log(this.router, this.route)
    // this.router.navigateByUrl('app/tabs/(manage:orderList)')
  }

}
