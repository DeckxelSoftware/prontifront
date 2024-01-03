import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetalleNovedadRolPagoTablaComponent} from './detalle-novedad-rol-pago-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {DetalleNovedadRolPagoPerfilModule} from '../detalle-novedad-rol-pago-perfil/detalle-novedad-rol-pago-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from "../../../../pipes/pipes.module";


@NgModule({
  declarations: [
    DetalleNovedadRolPagoTablaComponent
  ],
  exports: [
    DetalleNovedadRolPagoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    DetalleNovedadRolPagoPerfilModule,
    FormContainerModule,
    PipesModule
  ],
})
export class DetalleNovedadRolPagoTablaModule {
}
