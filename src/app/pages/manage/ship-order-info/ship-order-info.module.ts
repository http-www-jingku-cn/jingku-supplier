import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShipOrderInfoPage } from './ship-order-info.page';

const routes: Routes = [
  {
    path: '',
    component: ShipOrderInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShipOrderInfoPage]
})
export class ShipOrderInfoPageModule {}
