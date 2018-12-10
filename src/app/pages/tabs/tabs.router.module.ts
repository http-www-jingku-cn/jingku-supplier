import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'manage',
        children: [
          {
            path: '',
            loadChildren: '../manage/manage.module#ManagePageModule',
          }
        ]
      },
      {
        path: 'orderList',
        children: [
          {
            path: '',
            loadChildren: '../manage/order-list/order-list.module#OrderListPageModule'
          }
        ]
      },
      {
        path: 'goods',
        children: [
          {
            path: '',
            loadChildren: '../goods/goods.module#GoodsPageModule'
          }
        ]
      },
      {
        path: 'customer',
        children: [
          {
            path: '',
            loadChildren: '../customer-services/customer-services.module#CustomerServicesPageModule'
          }
        ]
      },
      {
        path: 'market',
        children: [
          {
            path: '',
            loadChildren: '../market/market.module#MarketPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/manage',
        pathMatch: 'full',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
