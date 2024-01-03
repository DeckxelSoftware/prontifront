import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetalleNovedadRolPagoTrabajadorComponent} from './detalle-novedad-rol-pago-trabajador.component';
import {TableModule} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {DetalleNovedadRolPagoPerfilModule} from '../detalle-novedad-rol-pago-perfil/detalle-novedad-rol-pago-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    DetalleNovedadRolPagoTrabajadorComponent
  ],
  exports: [
    DetalleNovedadRolPagoTrabajadorComponent
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
    ]
})
export class DetalleNovedadRolPagoTrabajadorModule {
}
