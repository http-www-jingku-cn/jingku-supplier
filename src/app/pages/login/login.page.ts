import { Component, OnInit } from '@angular/core';
import { HttpDataService } from '../../providers/http-data.service';
import { Storage } from '@ionic/storage';
import { ToastController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { StartupService } from 'src/app/providers/startup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public loginInfo: { member?: string, pass?: string } = { member: 'beijing', pass: 'admin123123' };

  constructor(
    public httpServ: HttpDataService,
    public storage: Storage,
    public router: Router,
    public route: ActivatedRoute,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public startupServ: StartupService,

  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let user_name = params.get('user_name');
      if (user_name) {
        this.loginInfo.member = user_name;
      };
    });
  }

  goToHome(form) {
    if (!this.loginInfo.member) {
      this.toastTip('请填写用户名');
      return;
    }
    if (!this.loginInfo.pass) {
      this.toastTip('请填写密码');
      return;
    }
    this.httpServ.login(this.loginInfo).subscribe((res) => {
      if (res.status == 1) {
        this.startupServ.setToken(res.data.token);
        this.startupServ.setStorage('HAS_LOGIN', true);
        this.httpServ.sessiontoken().subscribe(data => {
          this.startupServ.setSessionToken(data.data.session_token);
          this.navCtrl.navigateForward('/tabs/manage')
        })
      }
    }, (res) => {
      console.log(res);
    })
  }

  async toastTip(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
