import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpDataService } from 'src/app/providers/http-data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  formData = {
    user_name: 'sss123',//用户名
    password: '123123',//密码
    new_pwd: '123123',//确认密码
    mobile: '18518042404',//手机号码
    mobile_code: '123456',//短信验证码
    frdb: '孙山杉',//公司法人
    frdb_code: '420583199508138888',//公司法人身份证号
    frdb_code_zm: '',//公司法人身份证正面
    frdb_code_fm: '',//公司法人身份证反面
    shop_name: '',//店铺名称
    company: '艾薇',//公司名称
    province: '2',//省份
    city: '52',//城市
    district: '503',//县区
    shop_address: '后现代城',//详细地址
    company_yyzz_sn: '123123',//营业执照号
    swdesn: '',//税务登记代码
    zzjgsn: '',//组织机构代码
    shop_member: '',//商店联系人
    company_yyzz: "",//营业执照
    company_datelin_start: '2019-01-04',//营业期限开始
    company_datelin_end: '2019-01-05',//营业期限结束
  }
  regionlist: any;
  cityList: any;
  districtList: any;

  constructor(
    public navCtrl: NavController,
    public httpServ: HttpDataService,
  ) { }

  ngOnInit() {
    this.getRegionlist(1)
  }
  private wait: number = 60;
  private disabled: Boolean = false;
  private value: String = '发送验证码';
  private timer: any;
  private time() {
    if (this.wait == 0) {
      this.disabled = false;
      this.timer = null;
      this.value = "发送验证码";
      this.wait = 60;
      return;
    } else {
      this.disabled = true;
      this.value = "(" + this.wait + ")秒后重新发送";
      let self = this;
      this.timer = setTimeout(function () {
        self.wait--;
        self.time();
      }, 1000)
    }
  }
  getMobileCode() {
    this.httpServ.sendsms({
      type: 'sreg',
      mobile: this.formData.mobile,
    }).subscribe(data => {
      if (data.status == 1) {
        this.time();
      }
    })
  }
  getRegionlist(id?) {
    this.httpServ.regionlist({ id: id }, { showLoading: false }).subscribe(res => {
      if (res.status == 1) {
        this.regionlist = res.data;
      }
    })
  }
  getCityList(id?) {
    this.httpServ.regionlist({ id: id }, { showLoading: false }).subscribe(res => {
      if (res.status == 1) {
        this.cityList = res.data;
        this.formData.city = '';
      }
    })
  }
  getDistrictList(id?) {
    this.httpServ.regionlist({ id: id }, { showLoading: false }).subscribe(res => {
      if (res.status == 1) {
        this.districtList = res.data;
        this.formData.district = '';
      }
    })
  }
  signin() {
    this.httpServ.register(this.formData).subscribe(res => {
      if (res.status == 1) {
        this.navCtrl.navigateBack(['/login', { user_name: this.formData.user_name }]);
      }
    })
  }
  login() {
    this.navCtrl.navigateBack('/login');
  }
}
