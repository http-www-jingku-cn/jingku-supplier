import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { AuthGuard } from 'src/app/providers/auth.guard';

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
        path: 'messages',
        children: [
          {
            path: '',
            loadChildren: '../message-list/message-list.module#MessageListPageModule'
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
