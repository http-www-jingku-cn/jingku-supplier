import { NgModule } from '@angular/core';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { ComponentsModule } from './components/components.module';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

@NgModule({
  declarations: [],
  imports: [
    PipesModule,
    DirectivesModule,
    ComponentsModule,
    NgZorroAntdMobileModule
  ],
  exports: [
    PipesModule,
    DirectivesModule,
    ComponentsModule,
    NgZorroAntdMobileModule
  ]
})
export class SharedModule { }
