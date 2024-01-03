import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetallePagoTablaComponent} from './detalle-pago-tabla.component';
import {TableModule} from "primeng/table";
import {PipesModule} from "../../../../pipes/pipes.module";


@NgModule({
  declarations: [
    DetallePagoTablaComponent
  ],
    imports: [
        CommonModule,
        TableModule,
        PipesModule
    ],
  exports: [
    DetallePagoTablaComponent
  ]
})
export class DetallePagoTablaModule {
}
