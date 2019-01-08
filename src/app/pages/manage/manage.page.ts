import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { StartupService } from 'src/app/providers/startup.service';
import { ChatService } from 'src/app/providers/webim/chat.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.page.html',
  styleUrls: ['./manage.page.scss'],
})
export class ManagePage implements OnInit {
  counts: any;
  supplierInfo: any;

  constructor(
    public router: Router,
    public navCtrl: NavController,
    public httpServ: HttpDataService,
    public startupServ: StartupService,
    public chatServ: ChatService,
  ) {
  }

  ngOnInit() {

    this.getOrderNum();
    this.getSupplierInfo();
  }

  getOrderNum() {
    this.httpServ.order_num({}, { showLoading: true }).subscribe(res => {
      if (res.status == 1) {
        this.counts = res.data;
      }
    })
  }
  goOrderListPage() {
    this.navCtrl.navigateForward('manage/orderList')
  }
  getSupplierInfo() {
    this.httpServ.supplierInfo({}, { showLoading: false }).subscribe(res => {
      if (res.status == 1) {
        this.supplierInfo = res.data;
        this.startupServ.setStorage('WEBIM_INFO', res.data.Userig);
        this.startupServ.getStorage('WEBIM_INFO').then(res => {
          if (!res) return;
          // Redirect the user
          this.chatServ.webimLogin({
            // identifier: "ceshi_2891",
            identifier: res.identifier, //当前用户ID,必须是否字符串类型，必填
            // usersig: "eJxlkE1PgzAAhu-8ioYrxrV1xdabOhQWWDSaLezSMGilbOOjLaIx-neVmUji*XmS9*PDAQC4z-HTeZbnTV9bbt9b4YIr4EL37A*2rSp4ZvmFLv5B8dYqLXgmrdAjxIRhCKeKKkRtlVS-Qi5MqTimDE0cU*z5mDMqaA4hIvTS96eKehlhEqS30eMi3ewDP1yYXu96Cjdxp2WaDdstI1FKKpreNFF7qDwcrIeovE4ONig7yCy23qq-2xn-GDbdTJplJVd1QtbxEC-vy4eZF04irTqe7kBkjinFjJEJfRXaqKY*rf7uixBi8Ge68*l8AbEDXmQ_",
            userSig: res.Userig,
            //当前用户身份凭证，必须是字符串类型，必填
            identifierNick: res.nick_name, //当前用户昵称，不用填写，登录接口会返回用户的昵称，如果没有设置，则返回用户的id
            headurl: res.avatar //当前用户默认头像，选填，如果设置过头像，则可以通过拉取个人资料接口来得到头像信息
          });
        })
      }
    })
  }

}
