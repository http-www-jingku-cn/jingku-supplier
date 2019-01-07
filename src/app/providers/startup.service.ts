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
  hasLogin: any;

  constructor(
    public storage: Storage,
  ) { }

  setToken(value) {
    this.storage.set('APP_TOKEN', value).then(res => {
      this.token = value;
    });
  }
  setSessionToken(value) {
    this.storage.set('APP_SESSIONTOKEN', value).then(res => {
      this.sessionToken = value;
    });
  }
  getToken() {
    return zip(
      from(this.storage.get('APP_TOKEN')),
      from(this.storage.get('APP_SESSIONTOKEN')),
      from(this.storage.get('HAS_LOGIN')),
    ).pipe(
      //switchMap()
    ).toPromise().then(([token, sessionToken, has_login]) => {
      this.token = token;
      this.sessionToken = sessionToken;
      this.hasLogin = has_login;
      return [token, sessionToken];
    })
  }
  setStorage(key, value) {
    this.storage.set(key, value);
  }
  getStorage(value) {
    return this.storage.get(value);
  }
  removeStorage(key) {
    return this.storage.remove(key);
  }
  load() {
    return this.getToken()
  }
}
