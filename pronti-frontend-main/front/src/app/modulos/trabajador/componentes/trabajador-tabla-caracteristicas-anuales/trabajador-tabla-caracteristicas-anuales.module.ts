import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrabajadorTablaCaracteristicasAnualesComponent} from './trabajador-tabla-caracteristicas-anuales.component';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {AccordionModule} from "primeng/accordion";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {PipesModule} from "../../../../pipes/pipes.module";


@NgModule({
  declarations: [
    TrabajadorTablaCaracteristicasAnualesComponent
  ],
  imports: [
    CommonModule,
    FormContainerModule,
    AccordionModule,
    TableModule,
    ButtonModule,
    PipesModule
  ],
  exports: [
    TrabajadorTablaCaracteristicasAnualesComponent
  ]
})
export class TrabajadorTablaCaracteristicasAnualesModule {
}
