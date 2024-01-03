import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoTablaComponent } from './pago-tabla.component';
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {DetallePagoTablaModule} from "../detalle-pago-tabla/detalle-pago-tabla.module";



@NgModule({
  declarations: [
    PagoTablaComponent
  ],
  exports: [
    PagoTablaComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DetallePagoTablaModule
  ]
})
export class PagoTablaModule { }
