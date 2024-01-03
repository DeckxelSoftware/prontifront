import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SolicitudPrestamoTablaComponent} from './solicitud-prestamo-tabla.component';
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
import {SolicitudPrestamoPerfilModule} from "../solicitud-prestamo-perfil/solicitud-prestamo-perfil.module";


@NgModule({
  declarations: [
    SolicitudPrestamoTablaComponent
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
    SolicitudPrestamoPerfilModule
  ],
  exports: [
    SolicitudPrestamoTablaComponent
  ]
})
export class SolicitudPrestamoTablaModule {
}
