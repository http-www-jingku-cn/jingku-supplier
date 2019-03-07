import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/providers/webim/chat.service';
import { StartupService } from 'src/app/providers/startup.service';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { ScanPage } from '../scan/scan.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  supplierInfo: any;

  constructor(
    public chatServ: ChatService,
    private httpServ: HttpDataService,
    private startupServ: StartupService,
    private modalController: ModalController,
    ) {

  }
  ngOnInit() {

    this.httpServ.supplierInfo({}, { showLoading: true }).subscribe(res => {
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
  
  async openScan() {
    
    const modal = await this.modalController.create({
      component: ScanPage,
      mode: 'md',

    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
   
  }
}
