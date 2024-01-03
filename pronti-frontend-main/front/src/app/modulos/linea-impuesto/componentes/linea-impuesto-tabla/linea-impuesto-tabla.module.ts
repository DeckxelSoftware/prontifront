import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LineaImpuestoTablaComponent} from './linea-impuesto-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {LineaImpuestoPerfilModule} from '../linea-impuesto-perfil/linea-impuesto-perfil.module';
import {FormContainerModule} from "../../../../componentes/forms/form-container/form-container.module";
import {HttpCuentaContableModule} from "../../../cuenta-contable/servicios/http-cuenta-contable-module";


@NgModule({
  declarations: [
    LineaImpuestoTablaComponent
  ],
  exports: [
    LineaImpuestoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    LineaImpuestoPerfilModule,
    FormContainerModule,
    HttpCuentaContableModule,
  ],
})
export class LineaImpuestoTablaModule {
}
