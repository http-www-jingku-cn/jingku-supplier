import { Injectable } from '@angular/core';
import { HttpDataService } from 'src/app/providers/http-data.service';
import { PopoversService } from 'src/app/providers/popovers/popovers.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    public httpServ: HttpDataService,
    public popoversServ: PopoversService,
    ) { }

  getOrderList(){
     
  }
  
  prepare(order) {
    this.httpServ.prepare({
      id: order.id
    }).subscribe(res => {
      if (res.status == 1) {
        this.popoversServ.presentToast(res.info);
        order.operable_list.prepare = false;
      }
    })
  }
}

