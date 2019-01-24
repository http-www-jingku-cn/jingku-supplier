import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoodsPage } from './goods.page';
import { SharedModule } from 'src/app/shared.module';

const routes: Routes = [
  {
    path: '',
    component: GoodsPage
  },
  { path: 'goods-info/:id', loadChildren: './goods-info/goods-info.module#GoodsInfoPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [GoodsPage]
})
export class GoodsPageModule { }
