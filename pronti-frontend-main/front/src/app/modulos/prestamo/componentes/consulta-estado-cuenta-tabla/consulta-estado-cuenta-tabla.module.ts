import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultaEstadoCuentaTablaComponent } from './consulta-estado-cuenta-tabla/consulta-estado-cuenta-tabla.component';
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {MatTabsModule} from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from "@angular/material/dialog";
import {PrestamoPerfilModule} from "../prestamo-perfil/prestamo-perfil.module";
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {RippleModule} from "primeng/ripple";
import {PipesModule} from "../../../../pipes/pipes.module";
import {
  AbonoPrestamoTablaModule
} from "../../../abono-prestamo/componentes/abono-prestamo-tabla/abono-prestamo-tabla.module";
import {HttpAbonoPrestamoModule} from "../../../abono-prestamo/servicios/http-abono-prestamo-module";



@NgModule({
  declarations: [
    ConsultaEstadoCuentaTablaComponent
  ],
  exports: [
    ConsultaEstadoCuentaTablaComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    PrestamoPerfilModule,
    FormContainerModule,
    RippleModule,
    PipesModule,
  ]
})
export class ConsultaEstadoCuentaTablaModule { }
