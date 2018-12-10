import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class PopoversService {
  loadingElm;

  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) {

  }
  async presentLoading(message = '') {
    this.loadingElm = await this.loadingController.create({
      duration: 20000,
      message: message,
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await this.loadingElm.present();
  }
  closeLoading() {
    this.loadingElm.dismiss && this.loadingElm.dismiss()
  }
  async presentToast(message, showCloseButton = true) {
    const toast = await this.toastController.create({
      duration: 2000,
      message: message,
      showCloseButton: showCloseButton,
      position: 'top',
      closeButtonText: '取消'
    });
    toast.present();
  }
}
