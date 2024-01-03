import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalCrearSaldoCuentaComponent} from './modal-crear-saldo-cuenta.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatExpansionModule} from "@angular/material/expansion";
import {AccordionModule} from "primeng/accordion";
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {HttpCuentaContableModule} from "../../servicios/http-cuenta-contable-module";


@NgModule({
  declarations: [
    ModalCrearSaldoCuentaComponent
  ],
  exports: [
    ModalCrearSaldoCuentaComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatExpansionModule,
    AccordionModule,
    FormContainerModule,
    HttpCuentaContableModule,
  ]
})
export class ModalCrearSaldoCuentaModule {
}
