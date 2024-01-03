import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalCrearTrabajadorComponent} from './modal-crear-trabajador.component';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {HttpUsuarioModule} from "../../../usuario/servicios/http-usuario-module";
import {
  HttpListaValoresDetalleModule
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-module";
import {HttpTrabajadorModule} from "../../servicios/http-trabajador-module";
import {HttpCuentaContableModule} from "../../../cuenta-contable/servicios/http-cuenta-contable-module";
import {MatDialogModule} from "@angular/material/dialog";
import {HttpAgenciaModule} from "../../../agencia/servicios/http-agencia-module";


@NgModule({
  declarations: [
    ModalCrearTrabajadorComponent
  ],
  imports: [
    CommonModule,
    FormContainerModule,
    HttpUsuarioModule,
    HttpListaValoresDetalleModule,
    HttpTrabajadorModule,
    HttpCuentaContableModule,
    MatDialogModule,
    HttpAgenciaModule,
  ],
  exports: [
    ModalCrearTrabajadorComponent
  ]
})
export class ModalCrearTrabajadorModule {
}
