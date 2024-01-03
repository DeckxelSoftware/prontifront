import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrestamoTablaComponent} from './prestamo-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {PrestamoPerfilModule} from '../prestamo-perfil/prestamo-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';
import {PipesModule} from '../../../../pipes/pipes.module';
import {
  AbonoPrestamoTablaModule
} from "../../../abono-prestamo/componentes/abono-prestamo-tabla/abono-prestamo-tabla.module";
import {HttpAbonoPrestamoModule} from "../../../abono-prestamo/servicios/http-abono-prestamo-module";


@NgModule({
  declarations: [
    PrestamoTablaComponent
  ],
  exports: [
    PrestamoTablaComponent,
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
    AbonoPrestamoTablaModule,
    HttpAbonoPrestamoModule,
  ],
})
export class PrestamoTablaModule {
}
