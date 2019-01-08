import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { InfoMap, ChatService } from 'src/app/providers/webim/chat.service';
import { NavController, Events } from '@ionic/angular';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { ActivatedRoute } from '@angular/router';

declare var webim: any;

@Component({
  selector: 'app-customer-services',
  templateUrl: './customer-services.page.html',
  styleUrls: ['./customer-services.page.scss'],
})
export class CustomerServicesPage implements OnInit {

  parmas: InfoMap

  text: string = '';


  constructor(
    public navCtrl: NavController,
    public ele: ElementRef,
    public chatServ: ChatService,
    public httpServ: HttpDataService,
    public events: Events,
    private renderer: Renderer,
    public route: ActivatedRoute,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomeServicesPage');
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.parmas = params['params'];
      if (webim.checkLogin()) {
        this.chatServ.onSelSess(this.parmas.selType, this.parmas.selToID);

      } else {
        this.events.subscribe('im:login', () => {
          this.chatServ.onSelSess(this.parmas.selType, this.parmas.selToID);
        })
      }
      let msgflow = this.ele.nativeElement.getElementsByClassName("message")[0];

      this.events.subscribe('im:addMsg', () => {
        console.warn('im:addMsg')
        // this.content.scrollToBottom(0);
        msgflow.scrollTop = msgflow.scrollHeight;
      })
    });
    /* if (this.parmas.suppliers_id) {
    this.httpServ.CustomerService({
       order_id: this.parmas.order_id,
       goods_id: this.parmas.goods_id,
       suppliers_id: this.parmas.suppliers_id
    }).then(data => {

    })
 } */
  }
  ngOnDestroy() {
    this.events.unsubscribe('im:addMsg');
    webim.setAutoRead(this.chatServ.selSess, false, false);
  }
  ngAfterViewInit() {
    let msgflow = this.ele.nativeElement.getElementsByClassName("message")[0];

    msgflow.onscroll = () => {
      if (msgflow.scrollTop == 0) {
        msgflow.scrollTop = 10;
        if (this.chatServ.selType == webim.SESSION_TYPE.C2C) {
          // console.log(1)
          this.chatServ.getPrePageC2CHistoryMsgs();
        } else {
          // console.log(2)
          this.chatServ.getPrePageGroupHistoryMsgs();
        }
      }
    }
  }
  sendMsg($t) {
    if (!$t.value) {
      return;
    }
    this.chatServ.onSendMsg($t.value);
    $t.value = '';
  }
  showReSend(msgContent, random) {

  }
  selectEmotionImg(selImg) {
    this.text = this.text + selImg[0];
  }
  insertText($t, myValue) {
    if ($t.selectionStart || $t.selectionStart == '0') {
      let startPos = $t.selectionStart;
      let endPos = $t.selectionEnd;
      let scrollTop = $t.scrollTop;
      $t.value = $t.value.substring(0, startPos) + myValue[0] + $t.value.substring(endPos, $t.value.length);
      $t.focus();
      $t.selectionStart = startPos + myValue[0].length;
      $t.selectionEnd = startPos + myValue[0].length;
      $t.scrollTop = scrollTop;
    } else {
      $t.value += myValue[0];
      $t.focus();
    }
  }

}
