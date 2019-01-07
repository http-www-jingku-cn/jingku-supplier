import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 's-iframe-browser',
  templateUrl: './iframe-browser.page.html',
  styleUrls: ['./iframe-browser.page.scss'],
})
export class IframeBrowserPage implements OnInit {

  _browser: any = {
    isLoaded: false, // 网页是否被加载
    proObj: null, // 进度条对象
    progress: 0, // 网页访问的进度条
    secUrl: '', // 安全链接
    title: '加载中…',
    url: '',
    share: null // 是否具有分享功能（传递一个分享对象ShareModel过来）
  };

  shareConfig: any = {
    isShow: false
  }; // 分享控制的配置
  @ViewChild('iframe') myIframe: ElementRef
  listenGlobalFun: Function;
  browser: any;

  constructor(
    public navCtrl: NavController,
    public route: ActivatedRoute,
    private renderer: Renderer,
  ) {
    this.listenGlobalFun = this.renderer.listen('window', 'message', (res) => {
      console.log(res)
      if (res.data.type == 'function') {
        return eval(res.data.value);
      }
      this.removePage();
    })
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.browser = params['params'];
      setTimeout(() => {
        if (this.browser) {
          this._browser.secUrl = this.browser.url;
        } else {
          this._browser.secUrl = this._browser.url;
        }
      }, 500);
    });
    if (!this._browser.proObj) {
      this._browser.proObj = document.getElementById('progress');
      console.log(this._browser.proObj)
    }
    this.onprogress();
  }
  ngOnDestroy() {
    this.listenGlobalFun();
  }
  ionViewDidLoad() {
    
  }
  back() {
    history.back();
  }
  removePage() {

  }
  // 生成随机数
  private random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // 网页访问进度
  private onprogress() {
    // 随机时间
    let timeout = this.random(10, 30);

    let timer = setTimeout(() => {
      if (this._browser.isLoaded) {
        this._browser.proObj.style.width = '100%';
        clearTimeout(timer);
        return;
      }

      // 随机进度
      this._browser.progress += this.random(1, 5);

      // 随机进度不能超过 90%，以免页面还没加载完毕，进度已经 100% 了
      if (this._browser.progress > 90) {
        this._browser.progress = 90;
      }

      this._browser.proObj.style.width = this._browser.progress + '%';
      this.onprogress();
    }, timeout);
  }

  // 如果iframe页面加载成功后
  loaded() {
    setTimeout(() => {
      this._browser.isLoaded = true;
      this._browser.title = this.browser.title;
      this._browser.url = this.browser.url;
      if (this.browser.share) {
        this._browser.share = this.browser.share;
      }
    }, 800);
  }

  // 重新加载页面
  reload() {
    let title = this._browser.title;
    let url = this._browser.secUrl;
    this._browser.title = '加载中…';
    this._browser.secUrl = '';

    setTimeout(() => {
      this._browser.isLoaded = false;
      this._browser.progress = 0;
      if (!this._browser.proObj) {
        this._browser.proObj = document.getElementById('progress');
      }
      this.onprogress();
      this._browser.title = title;
      this._browser.secUrl = url;
    }, 10);
  }

  // 分享页面（作为popover的回调）
  share() {
    this.shareConfig.isShow = true;
    /*if(this.browser.share) {
      SocialSharing.share(this.browser.share.title, this.browser.share.content, '', this.browser.share.url).then(() => {

      }, (err) => {
        // Error!
        alert('错误：分享失败！' + err);
      });
    }*/
  }

}
