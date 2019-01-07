import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpDataService } from 'src/app/providers/http-data.service';

@Component({
  selector: 's-goods-card',
  templateUrl: './goods-card.component.html',
  styleUrls: ['./goods-card.component.scss']
})
export class GoodsCardComponent implements OnInit {

  constructor(
    public httpService: HttpDataService,
    public navCtrl: NavController,
  ) {
    console.log('Hello SingleCard Component');
  }
  @Input() data: any;

  animateClass: any = { 'fade-in-item': true };
  animateItems = [];

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  ngOnChanges() {
    this.animateItems = this.data || [];
  }
  goInfoPage(id) {
    console.log(id)
    this.navCtrl.navigateForward(['/tabs/goods/goods-info', id])
  }
}
