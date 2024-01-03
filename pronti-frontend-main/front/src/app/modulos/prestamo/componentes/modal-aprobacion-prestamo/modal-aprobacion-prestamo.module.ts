import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalAprobacionPrestamoComponent} from './modal-aprobacion-prestamo.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ContratoTablaModule} from "../../../contrato/componentes/contrato-tabla/contrato-tabla.module";
import {HttpContratoModule} from "../../../contrato/servicios/http-contrato-module";
import {EstadoContratoModule} from "../../../../servicios/estado-contrato/estado-contrato.module";
import {MatCardModule} from "@angular/material/card";
import {FormlyModule} from "@ngx-formly/core";
import {ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../../../../pipes/pipes.module";
import {CuotaPrestamoTablaModule} from "../cuota-prestamo-tabla/cuota-prestamo-tabla.module";
import {HttpPrestamoModule} from "../../servicios/http-prestamo-module";


@NgModule({
  declarations: [
    ModalAprobacionPrestamoComponent
  ],
  exports: [
    ModalAprobacionPrestamoComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ContratoTablaModule,
    HttpContratoModule,
    EstadoContratoModule,
    MatCardModule,
    FormlyModule,
    ReactiveFormsModule,
    PipesModule,
    CuotaPrestamoTablaModule,
    HttpPrestamoModule,
  ]
})
export class ModalAprobacionPrestamoModule {
}
