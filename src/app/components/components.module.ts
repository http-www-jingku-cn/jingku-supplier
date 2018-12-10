import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MyTabsComponent } from './my-tabs/my-tabs.component';
import { CountInputComponent } from './count-input/count-input.component';

const coms: any[] = [
    MyTabsComponent,
    CountInputComponent,
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        IonicModule,
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
