import { NgModule } from '@angular/core';
import { DirectivesModule } from './directives/directives.module';
import { PipesModule } from './pipes/pipes.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [],
  imports: [
    PipesModule,
    DirectivesModule,
    ComponentsModule
  ],
  exports: [
    PipesModule,
    DirectivesModule,
    ComponentsModule
  ]
})
export class SharedModule { }
