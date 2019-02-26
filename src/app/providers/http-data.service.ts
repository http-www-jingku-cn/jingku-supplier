import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError, from, zip } from 'rxjs';
import { catchError, map, tap, finalize, switchMap, mergeMap } from 'rxjs/operators';
import { StartupService } from './startup.service';
import { Router } from '@angular/router';
import { PopoversService } from './popovers/popovers.service';
import { LoadingController } from '@ionic/angular';

export interface HttpOptions {
  showLoading?: boolean;
  timeout?: number;
  showToast?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {

  constructor(
    private http: HttpClient,
    private startupServ: StartupService,
    private injector: Injector,
    private popoversServ: PopoversService,
    private loadingController: LoadingController,
  ) {

  }

  /**
 *  GET请求处理（一般用于获取数据）
 * @param url 后台接口api 例如：/api/test/6
 */
  get(url: string): Observable<any> {
    return this.http.get(`${url}`).pipe(
      map((res) => {
        return this.extractData(res);
      }),
      catchError((err: HttpErrorResponse) => {
        return this.handleData(err);
      })
    );
  }

  /**
   * POST请求处理（一般用于保存数据）
   * @param url 后台接口api
   * @param data 参数
   */
  post(url: string, data = {}, options: HttpOptions): Observable<any> {
    options = {
      showLoading: true,
      showToast: true,
      ...options
    };
    let loadingElm: Promise<HTMLIonLoadingElement> | Promise<{}>;
    if (options.showLoading) {
      loadingElm = this.loadingController.create({
        duration: 20000,
        message: '',
        translucent: true,
        cssClass: 'custom-class custom-loading'
      });
    } else {
      loadingElm = new Promise(resolve => resolve(false));
    }
    return from<any>(loadingElm).pipe(
      switchMap(loading => {
        loading && loading.present();
        return this.http.post(url, Object.assign(data, { session: this.startupServ.sessionToken })).pipe(
          map((res) => {
            return this.extractData(res, options);
          }),
          finalize(() => {
            loading && loading.dismiss();
          }),
          catchError((err: HttpErrorResponse) => {
            return this.handleData(err, options);
          })
        );
      })
    )
  }
  /**
   * PUT请求处理（一般用于更新数据）
   * @param url 后台接口api 例如：/api/test/6
   * @param data 参数
   */
  put(url: string, data = {}): Observable<any> {
    return this.http.put(url, data).pipe(
      map((res) => {
        return this.extractData(res);
      }),
      catchError((err: HttpErrorResponse) => {
        return this.handleData(err);
      })
    );
  }
  /**
   * DELETE请求处理（一般用于删除数据）
   * @param url 后台接口api 例如：/api/test/6
   */
  delete(url: string): Observable<{}> {
    return this.http.delete(url).pipe(
      map((res) => {
        return this.extractData(res);
      }),
      catchError((err: HttpErrorResponse) => {
        return this.handleData(err);
      })
    );
  }

  /**
   *  提取数据
   * @param res 返回结果
   */
  private extractData(res, options?: HttpOptions) {
    let body = res;
    if (body.status == 0) {
      options.showToast && this.popoversServ.presentToast(body.error_description || body.info);
    } else if (body.response_code == 2) {
      this.logout().subscribe(() => {//退出登录
        this.goTo('/login');
      });
      options.showToast && this.popoversServ.presentToast(body.msg);
    }
    return body || {};
  }
  /**
   * 错误消息类
   * @param error
   */
  private handleData(error: HttpErrorResponse, options?: HttpOptions): Observable<any> {
    console.log(error)
    switch (error.status) {
      case 200:

        break;
      case 401: // 未登录状态码
        this.popoversServ.presentToast('401');
        this.logout().subscribe(() => {//退出登录
          this.goTo('/login');
        });
        break;
      case 403:
        this.popoversServ.presentToast('403');
        break;
      case 404:
        this.popoversServ.presentToast('NOT FOUND');
        break;
      case 500:
        this.popoversServ.presentToast('500');
        // this.goTo(`/${event.status}`);
        break;
    }
    return of(error);
  }

  private goTo(url: string) {
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  login(data?, options?: HttpOptions) {
    return zip(
      this.post('/public/scrm/publics/login', data, options),
      this.sessiontoken()
    ).pipe(
      mergeMap(([token, sessionToken]) => {
        if (token.status == 1 && sessionToken.status == 1) {
          return zip(//必须等待token设置完成才能返回登录信息
            from(this.startupServ.setToken(token.data.token)),
            from(this.startupServ.setSessionToken(sessionToken.data.session_token)),
            from(this.startupServ.setStorage('LOGIN_INFO', token)),
          ).pipe(//
            map(res => {
              return [token, sessionToken];
            })
          )
        }
        return of([token, sessionToken])
      }),
      tap(([token, sessionToken]) => {
        console.log([token, sessionToken])
      })
    );
  }
  logout() {
    return zip(
      from(this.startupServ.removeToken()),
      from(this.startupServ.removeSessionToken()),
      from(this.startupServ.removeStorage('LOGIN_INFO')),
    )
  }
  sessiontoken(data?, options?: HttpOptions) {
    return this.post('http://price.jingkoo.net/public/scrm/Publics/_sessiontoken', data, options);
  }
  captcha(data?, options?: HttpOptions) {//验证码
    return this.post('/public/scrm/publics/captcha', data, options);
  }
  sendsms(data?, options?: HttpOptions) {//手机验证码
    return this.post('/public/scrm/publics/sendsms', data, options);
  }
  regionlist(data?, options?: HttpOptions) {//地区列表
    return this.post('/public/scrm/publics/regionlist', data, options);
  }
  register(data?, options?: HttpOptions) {//供货商注册
    return this.post('/public/scrm/publics/register', data, options);
  }
  orderList(data?, options?: HttpOptions) {//订单列表
    return this.post('/public/scrm/order/index', data, options);
  }
  orderInfo(data?, options?: HttpOptions) {//订单详情
    return this.post('/public/scrm/order/info ', data, options);
  }
  goodsList(data?, options?: HttpOptions) {//商品列表
    return this.post('/public/scrm/goods/index', data, options);
  }
  goodsInfo(data?, options?: HttpOptions) {//商品详情
    return this.post('/public/scrm/goods/info', data, options);
  }
  goods_on_sale(data?, options?: HttpOptions) {//商品上下架
    return this.post('/public/scrm/goods/goods_on_sale', data, options);
  }
  order_shipping(data?, options?: HttpOptions) {//订单物流轨迹
    return this.post('/public/scrm/order/order_shipping', data, options);
  }
  delivery_list(data?, options?: HttpOptions) {//订单物流轨迹
    return this.post('/public/scrm/order/delivery_list', data, options);
  }
  kshipping_list(data?, options?: HttpOptions) {//快递公司编码
    return this.post('/public/scrm/order/kshipping_list', data, options);
  }
  delivery_info(data?, options?: HttpOptions) {//发货单详情
    return this.post('/public/scrm/order/delivery_info', data, options);
  }
  delivery_del(data?, options?: HttpOptions) {//删除发货单
    return this.post('/public/scrm/order/delivery_del', data, options);
  }
  split_order(data?, options?: HttpOptions) {//生成发货单
    return this.post('/public/scrm/order/split_order', data, options);
  }
  delivery_ship(data?, options?: HttpOptions) {//发货单发货
    return this.post('/public/scrm/order/delivery_ship', data, options);
  }
  ordercancel(data?, options?: HttpOptions) {//铺货订单拒绝
    return this.post('/public/scrm/setmeal/ordercancel', data, options);
  }
  orderagree(data?, options?: HttpOptions) {//铺货订单审核通过
    return this.post('/public/scrm/setmeal/orderagree', data, options);
  }
  subcontract(data?, options?: HttpOptions) {//铺货订单修改合同时间
    return this.post('/public/scrm/setmeal/subcontract', data, options);
  }
  sealindex(data?, options?: HttpOptions) {//铺货合同盖章
    return this.post('/public/scrm/seal/sealindex', data, options);
  }
  infourlseal(data?, options?: HttpOptions) {//查看铺货合同
    return this.post('/public/scrm/seal/infourlseal', data, options);
  }
  sealinfo(data?, options?: HttpOptions) {//铺货合同签署
    return this.post('/public/scrm/seal/info', data, options);
  }
  order_num(data?, options?: HttpOptions) {//个人中心订单技术
    return this.post('/public/scrm/Order/order_num', data, options);
  }
  downloadpdf(data?, options?: HttpOptions) {//下载合同签署
    return this.post('/public/scrm/seal/downloadpdf', data, options);
  }
  supplierInfo(data?, options?: HttpOptions) {//供货商信息
    return this.post('/public/scrm/Supplier/info', data, options);
  }
  shipping_ino_name(data?, options?: HttpOptions) {//查询物流公司
    return this.post('/public/scrm/Order/shipping_ino_name', data, options);
  }
  prepare(data?, options?: HttpOptions) {//订单配货
    return this.post('/public/scrm/Order/prepare', data, options);
  }
  updateShippingNo(data?, options?: HttpOptions) {//修改物流
    return this.post('/public/scrm/Order/updateShippingNo', data, options);
  }
  opc_order(data?, options?: HttpOptions) {//导入opc
    return this.post('/public/scrm/Order/opc_order', data, options);
  }
  plan_list(data?, options?: HttpOptions) {//行情列表
    return this.post('/public/scrm/Plan/plan_list', data, options);
  }
  plan_info(data?, options?: HttpOptions) {//行情详情
    return this.post('/public/scrm/Plan/plan_info', data, options);
  }
  click_zan(data?, options?: HttpOptions) {//点赞
    return this.post('/public/scrm/Plan/click_zan', data, options);
  }
  writeComment(data?, options?: HttpOptions) {//评论
    return this.post('/public/scrm/Plan/comment', data, options);
  }
  getFileImg(data?, options?: HttpOptions) {//评论
    return this.post('/public/scrm/Publics/GetFileImg', data, options);
  }
  machiningIndex(data?, options?: HttpOptions) {//来镜加工列表
    return this.post('/public/scrm/Machining/index', data, options);
  }
  machiningInfo(data?, options?: HttpOptions) {//来镜加工详情
    return this.post('/public/scrm/Machining/info', data, options);
  }
  machiningUpdate(data?, options?: HttpOptions) {//来镜加工详情
    return this.post('/public/scrm/Machining/update', data, options);
  }
  returnsIndex(data?, options?: HttpOptions) {//退货单详情
    return this.post('/public/scrm/Returns/index', data, options);
  }
  returnsInfo(data?, options?: HttpOptions) {//退货单详情
    return this.post('/public/scrm/Returns/info', data, options);
  }
  barcodeBarCodeInfo(data?, options?: HttpOptions) {//
    return this.post('/public/scrm/Barcode/barCodeInfo', data, options);
  }
  barcodeBarCodeList(data?, options?: HttpOptions) {//
    return this.post('/public/scrm/Barcode/barCodeList', data, options);
  }
  barcodeBarCodeBinding(data?, options?: HttpOptions) {//绑定二维码
    return this.post('/public/scrm/Barcode/barCodeBinding', data, options);
  }
}
