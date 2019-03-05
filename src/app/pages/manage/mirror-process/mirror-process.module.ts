import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MirrorProcessPage } from './mirror-process.page';
import { SharedModule } from 'src/app/shared.module';

const routes: Routes = [
  {
    path: '',
    component: MirrorProcessPage
  },
  { path: 'info/:id', loadChildren: './mirror-process-info/mirror-process-info.module#MirrorProcessInfoPageModule' },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [MirrorProcessPage]
})
export class MirrorProcessPageModule { }
