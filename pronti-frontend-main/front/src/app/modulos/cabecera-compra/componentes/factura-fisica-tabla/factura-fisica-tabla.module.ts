import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FacturaFisicaTablaComponent} from './factura-fisica-tabla.component';
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    FacturaFisicaTablaComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ],
  exports: [
    FacturaFisicaTablaComponent
  ]
})
export class FacturaFisicaTablaModule {
}
