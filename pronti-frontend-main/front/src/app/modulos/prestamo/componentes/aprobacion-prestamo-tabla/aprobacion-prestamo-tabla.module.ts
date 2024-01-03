import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AprobacionPrestamoTablaComponent} from './aprobacion-prestamo-tabla.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {PipesModule} from "../../../../pipes/pipes.module";
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {CuotaPrestamoTablaModule} from "../cuota-prestamo-tabla/cuota-prestamo-tabla.module";


@NgModule({
  declarations: [
    AprobacionPrestamoTablaComponent
  ],
  exports: [
    AprobacionPrestamoTablaComponent
  ],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        PipesModule,
        FormContainerModule,
        CuotaPrestamoTablaModule
    ]
})
export class AprobacionPrestamoTablaModule {
}
