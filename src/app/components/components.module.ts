import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyTabsComponent } from './my-tabs/my-tabs.component';
import { CountInputComponent } from './count-input/count-input.component';
import { GoodsCardComponent } from './goods-card/goods-card.component';
import { DirectivesModule } from '../directives/directives.module';
import { RouterModule } from '@angular/router';

const coms: any[] = [
    MyTabsComponent,
    CountInputComponent,
    GoodsCardComponent,
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule,
        DirectivesModule
    ],
    declarations: [
        ...coms,
    ],
    exports: [
        ...coms
    ],
    entryComponents: [],
})
export class ComponentsModule { }
