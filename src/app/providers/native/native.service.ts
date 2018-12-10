import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NativeService {

  constructor(
    private platform: Platform,
  ) {
    // console.log(navigator.userAgent.toLowerCase());
    console.log(platform.platforms());
    // alert(JSON.stringify(platform.platforms()))
  }


	/**
	 * 是否真机环境
	 * @return {boolean}
	 */
  isMobile(): boolean {
    return this.platform.is('mobile')
  }
  isPwa() {
    return this.platform.is('pwa');
  }
  isMiniprogram() {
    return window && window['__wxjs_environment'] == 'miniprogram'
  }
  /**
   * 是否android真机环境
   * @return {boolean}
   */
  isAndroid() {
    return this.isMobile() && this.platform.is('android');
  }
  isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i)) {
      return ua.match(/MicroMessenger/i)[0] == "micromessenger";
    }
  }
  /**
   * 是否ios真机环境
   * @return {boolean}
   */
  isIos() {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

}
