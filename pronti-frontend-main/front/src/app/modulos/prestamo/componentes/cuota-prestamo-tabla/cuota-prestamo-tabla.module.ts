import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CuotaPrestamoTablaComponent} from './cuota-prestamo-tabla.component';
import {TableModule} from "primeng/table";
import {PipesModule} from "../../../../pipes/pipes.module";


@NgModule({
  declarations: [
    CuotaPrestamoTablaComponent
  ],
  exports: [
    CuotaPrestamoTablaComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    PipesModule
  ]
})
export class CuotaPrestamoTablaModule {
}
