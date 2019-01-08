import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { switchMap } from 'rxjs/operators';
import { from, zip } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  token: any;
  sessionToken: any;
  redirectUrl: string;//记录登录前路由链接用于登陆后重定向

  constructor(
    public storage: Storage,
  ) { }

  setToken(value) {
    return this.storage.set('APP_TOKEN', value).then(res => {
      this.token = value;
    });
  }
  removeToken() {
    return this.storage.remove('APP_TOKEN').then(res => {
      this.token = null;
    });
  }
  setSessionToken(value) {
    return this.storage.set('APP_SESSIONTOKEN', value).then(res => {
      this.sessionToken = value;
    });
  }
  removeSessionToken() {
    return this.storage.remove('APP_SESSIONTOKEN').then(res => {
      this.sessionToken = null;
    });
  }
  setStorage(key, value) {
    return this.storage.set(key, value);
  }
  getStorage(value) {
    return this.storage.get(value);
  }
  removeStorage(key) {
    return this.storage.remove(key);
  }
  getToken() {
    return zip(
      from(this.getStorage('APP_TOKEN')),
      from(this.getStorage('APP_SESSIONTOKEN')),
      from(this.getStorage('HAS_LOGIN')),
    ).pipe(
      //switchMap()
    ).toPromise().then(([token, sessionToken]) => {
      this.token = token;
      this.sessionToken = sessionToken;
      return [token, sessionToken];
    })
  }
  load() {
    return this.getToken()
  }
}
