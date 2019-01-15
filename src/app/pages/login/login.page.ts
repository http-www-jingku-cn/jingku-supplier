import { Component, OnInit } from '@angular/core';
import { HttpDataService } from '../../providers/http-data.service';
import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { StartupService } from 'src/app/providers/startup.service';
import { ChatService } from 'src/app/providers/webim/chat.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPsw:boolean = false;
  public loginInfo: { member?: string, pass?: string } = { member: '', pass: '' };

  constructor(
    public httpServ: HttpDataService,
    public route: ActivatedRoute,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public startServ: StartupService,
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
    this.httpServ.login(this.loginInfo).subscribe(([token, sessionToken]) => {
      if (token.status == 1 && sessionToken.status == 1) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        let redirect = this.startServ.redirectUrl ? this.startServ.redirectUrl : '/tabs/manage';
        // Set our navigation extras object
        // that passes on our global query params and fragment
        let navigationExtras: NavigationExtras = {
          queryParamsHandling: 'preserve',
          preserveFragment: true
        };
        // Redirect the user
        this.navCtrl.navigateForward([redirect], navigationExtras);
      }
    });
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
