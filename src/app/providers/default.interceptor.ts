import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse,
    HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent,
} from '@angular/common/http';
import { Observable, zip, from } from 'rxjs';
import { finalize, tap, map, mergeMap, switchMap } from 'rxjs/operators';
import { StartupService } from './startup.service';
import { Storage } from '@ionic/storage';

/*设置请求的基地址，方便替换*/
export const baseurl: string = 'http://price.jingkoo.net';
// export const baseurl: string = 'http://price.jingku.cn';

/**
 * 默认HTTP拦截器，其注册细节见 `app.module.ts`
 */
@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
    constructor(
        private injector: Injector,
        public startupServ: StartupService,
        public storage: Storage,
    ) { }

    private goTo(url: string) {
        setTimeout(() => this.injector.get(Router).navigateByUrl(url));
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        return zip(
            from(this.storage.get('APP_TOKEN')),
            from(this.storage.get('APP_SESSIONTOKEN'))
        ).pipe(
            switchMap(([token, sessionToken]) => {
                // console.log(token, sessionToken)
                let authInfo = {
                    token: token || '',//不写空angular会报错
                    sessiontoken: sessionToken || ''
                };
                // 统一加上服务端前缀
                let url = req.url;
                if (!url.startsWith('https://') && !url.startsWith('http://')) {
                    url = baseurl + url;
                }
                const newReq = req.clone({
                    url: url,
                    headers: req.headers
                        .set('token', authInfo.token)
                        .set('Content-Type', 'application/json;charset=UTF-8;'),
                    // params: req.params.set('session', authInfo.sessiontoken),

                });

                const started = Date.now();
                let ok: string;

                return next.handle(newReq).pipe(
                    tap(
                        // Succeeds when there is a response; ignore other events
                        //RxJS 的 tap 操作符会捕获请求成功了还是失败了
                        event => ok = event instanceof HttpResponse ? 'succeeded' : '',
                        // Operation failed; error is an HttpErrorResponse
                        error => ok = 'failed'
                    ),
                    // Log when response observable either completes or errors
                    //RxJS 的 finalize 操作符无论在响应成功还是失败时都会调用（这是必须的）
                    finalize(() => {
                        const elapsed = Date.now() - started;
                        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
                        console.log(msg)
                        // this.messenger.add(msg);
                    })
                );
            })
        )
    }
}
