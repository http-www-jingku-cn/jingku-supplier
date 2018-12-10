import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StartupService {
  token: any;
  sessionToken: any;

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
    return new Promise((resolve, reject) => {
      this.storage.get('APP_TOKEN').then(res => {
        if (res) {
          this.token = res;
        }
        this.storage.get('APP_SESSIONTOKEN').then(res => {
          resolve();
          if (res) {
            this.sessionToken = res;
          }
        });
      });
    })
  }
  setStorage(key, value) {
    this.storage.set(key, value);
  }
  getStorage(value) {
    return this.storage.get(value);
  }
  load() {
    return this.getToken()
  }
}
