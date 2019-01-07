import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { IonInput, IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {
  @ViewChild('comment') commentInput: IonInput;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  data: any;
  showinput: boolean;//评论输入框显示状态
  list: any;//日志列表
  currentLog: any;//当前评论的日志
  commentValue: string;//评论输入框
  currentComment: any;

  constructor(
    public httpServ: HttpDataService,

  ) { }

  ngOnInit() {
    this.httpServ.plan_list().subscribe(res => {
      if (res.status == 1) {
        this.data = res.data;
        this.list = res.data.list || [];
      }
    })
  }
  doRefresh(event) {
    this.httpServ.plan_list({
      page: 1,
      size: 20
    }, { showLoading: false }).subscribe(res => {
      if (res.status == 1) {
        this.infiniteScroll.disabled = false;
        this.data = res.data;
        this.list = res.data.list || [];
        event.target.complete();
      }
    })
  }
  loadData(event) {
    if (this.data && this.data.page < this.data.lastPage) {
      this.httpServ.plan_list({
        page: ++this.data.page,
        size: 20
      }, { showLoading: false }).subscribe(res => {
        event.target.complete();
        if (res.status == 1) {
          this.data = res.data;
          this.list = [...this.list, ...res.data.list];
        }
      })
    } else {
      event.target.disabled = true;
    }
  }

  clickContent(event) {//滑动或者点击页面隐藏点赞评论按钮
    this.list.forEach((value, index) => {
      this.list[index].showbtns = false;
    })
  }
  toggle(item) {//点赞评论按钮
    this.list.map((value, index) => {
      if (item.id != value.id) {
        value.showbtns = false;
      }
      return value;
    })
    item.showbtns = !item.showbtns;
  }
  like(item) {
    item.showbtns = false;
    this.httpServ.click_zan({ type: 3, id: item.id }, { showLoading: false }).subscribe(res => {
      if (res.status == 1) {
        this.httpServ.plan_info({ id: item.id }, { showLoading: false }).subscribe(plan_info => {
          if (plan_info.status == 1) {
            Object.assign(item, plan_info.data)
          }
        })
      }
    })
  }
  writeComment(event, item, comment?) {
    event.stopPropagation();
    item.showbtns = false;
    this.showinput = true;
    this.currentLog = item;
    this.currentComment = comment ? comment : null;

    setTimeout(() => {
      this.commentInput.setFocus();
    }, 500);
  }
  ionBlur(comment) {
    this.showinput = false;
    this.currentLog = null;
  }
  submitComment(event) {
    var event = event || window.event;//消除浏览器差异  
    const id = this.currentLog.id;
    if (event.keyCode == 13) {
      this.showinput = false;//关闭输入框
      this.httpServ.writeComment({
        type: 3,
        cid: id,
        content: this.commentValue,
        id: this.currentComment ? this.currentComment.id : null
      }, { showLoading: false }).subscribe(res => {
        if (res.status == 1) {
          this.commentValue = '';
          this.httpServ.plan_info({ id: id }, { showLoading: false }).subscribe(plan_info => {
            if (plan_info.status == 1) {
              this.list.map(item => {
                if (item.id == id) {
                  return Object.assign(item, plan_info.data);
                }
              })
            }
          })
        }
      })
    }
  }
}
