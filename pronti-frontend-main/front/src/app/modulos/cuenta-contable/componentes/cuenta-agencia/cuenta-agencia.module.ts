import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CuentaAgenciaComponent} from './cuenta-agencia.component';
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {CuentaContablePerfilModule} from "../cuenta-contable-perfil/cuenta-contable-perfil.module";
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {PipesModule} from "../../../../pipes/pipes.module";


@NgModule({
  declarations: [
    CuentaAgenciaComponent
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
  ],
  exports: [
    CuentaAgenciaComponent
  ]
})
export class CuentaAgenciaModule {
}
