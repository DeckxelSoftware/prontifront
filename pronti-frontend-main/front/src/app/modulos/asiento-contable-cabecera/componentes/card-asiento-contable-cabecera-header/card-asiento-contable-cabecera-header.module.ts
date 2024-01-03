import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardAsientoContableCabeceraHeaderComponent } from './card-asiento-contable-cabecera-header.component';
import {PipesModule} from '../../../../pipes/pipes.module';



@NgModule({
  declarations: [
    CardAsientoContableCabeceraHeaderComponent
  ],
  exports: [
    CardAsientoContableCabeceraHeaderComponent
  ],
    imports: [
        CommonModule,
        PipesModule
    ]
})
export class CardAsientoContableCabeceraHeaderModule { }
