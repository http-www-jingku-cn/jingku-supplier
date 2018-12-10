import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManagePage } from './manage.page';

const routes: Routes = [
  {
    path: '',
    component: ManagePage,
  }, {
    path: 'order-list',
    loadChildren: './order-list/order-list.module#OrderListPageModule',
  }, {
    path: 'order-info/:id',
    loadChildren: './order-list/order-info/order-info.module#OrderInfoPageModule',
  },
  {
    path: 'order-list-d',
    loadChildren: './order-list-d/order-list-d.module#OrderListDPageModule'
  },
  {
    path: 'order-info-d',
    loadChildren: './order-list-d/order-info-d/order-info-d.module#OrderInfoDPageModule'
  },
  { path: 'ship-order', loadChildren: './ship-order/ship-order.module#ShipOrderPageModule' },
  { path: 'ship-order-info', loadChildren: './ship-order-info/ship-order-info.module#ShipOrderInfoPageModule' },
  { path: 'write-express-number/:id', loadChildren: './write-express-number/write-express-number.module#WriteExpressNumberPageModule' },
  { path: 'logistics-tracking/:id', loadChildren: './logistics-tracking/logistics-tracking.module#LogisticsTrackingPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManagePage]
})
export class ManagePageModule { }
