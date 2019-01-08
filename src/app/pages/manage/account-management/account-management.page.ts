import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpDataService } from 'src/app/providers/http-data.service';

@Component({
  selector: 's-account-management',
  templateUrl: './account-management.page.html',
  styleUrls: ['./account-management.page.scss'],
})
export class AccountManagementPage implements OnInit {
  supplierInfo: any;

  constructor(
    public navCtrl: NavController,
    public httpServ: HttpDataService,
  ) { }

  ngOnInit() {
    this.httpServ.supplierInfo({}, { showLoading: false }).subscribe(res => {
      if (res.status == 1) {
        this.supplierInfo = res.data;
      }
    })
  }
  logout() {
    this.httpServ.logout().subscribe(res => {
      this.navCtrl.navigateBack('/login')
    });
  }

}
