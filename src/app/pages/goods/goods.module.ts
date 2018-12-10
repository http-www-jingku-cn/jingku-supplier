import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoodsPage } from './goods.page';

const routes: Routes = [
  {
    path: '',
    component: GoodsPage
  }, {
    path: 'goodsList',
    loadChildren: './goods-list/goods-list.module#GoodsListPageModule',
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GoodsPage]
})
export class GoodsPageModule { }
