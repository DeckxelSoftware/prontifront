import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardAsientoContableCabeceraComponent} from './card-asiento-contable-cabecera.component';
import {PipesModule} from "../../../../pipes/pipes.module";


@NgModule({
  declarations: [
    CardAsientoContableCabeceraComponent
  ],
  exports: [
    CardAsientoContableCabeceraComponent
  ],
  imports: [
    CommonModule,
    PipesModule
  ]
})
export class CardAsientoContableCabeceraModule {
}
