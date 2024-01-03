import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SaldoCuentaTablaComponent} from './saldo-cuenta-tabla.component';
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {CuentaContablePerfilModule} from "../cuenta-contable-perfil/cuenta-contable-perfil.module";
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {PipesModule} from "../../../../pipes/pipes.module";
import {ModalCrearSaldoCuentaModule} from "../modal-crear-saldo-cuenta/modal-crear-saldo-cuenta.module";


@NgModule({
  declarations: [
    SaldoCuentaTablaComponent
  ],
  exports: [
    SaldoCuentaTablaComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    CuentaContablePerfilModule,
    FormContainerModule,
    PipesModule,
    ModalCrearSaldoCuentaModule
  ]
})
export class SaldoCuentaTablaModule {
}
