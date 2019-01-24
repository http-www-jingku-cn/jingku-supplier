import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService, RecentSessMap } from 'src/app/providers/webim/chat.service';
import { Router } from '@angular/router';
import { NavController, IonList } from '@ionic/angular';
import { HttpDataService } from 'src/app/providers/http-data.service';

@Component({
  selector: 's-message-list',
  templateUrl: './message-list.page.html',
  styleUrls: ['./message-list.page.scss'],
})
export class MessageListPage implements OnInit {

  @ViewChild(IonList) msgList: IonList;
  constructor(
    public chatServ: ChatService,
    public router: Router,
    public navCtrl: NavController,
    public httpServ: HttpDataService,
  ) { }

  ngOnInit(

  ) {

  }
  CustomeServicesPage(item: RecentSessMap) {
    let selType = item.SessionType;
    let selToId = item.SessionId;
    let name = item.SessionNick;
    let params = {
      selType: selType,
      selToID: selToId,
      name: name
    };
    this.navCtrl.navigateForward(['/tabs/messages/customer-services', params]);
  }

  doRefresh(event) {
    this.msgList.closeSlidingItems().then(() => {
      this.chatServ.initRecentContactList(() => {
        event.target.complete();
      }, () => {
        event.target.complete();
      });
    });
  }
}
