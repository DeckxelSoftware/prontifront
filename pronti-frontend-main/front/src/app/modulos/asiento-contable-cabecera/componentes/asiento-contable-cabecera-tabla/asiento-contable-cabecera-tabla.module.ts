import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AsientoContableCabeceraTablaComponent} from './asiento-contable-cabecera-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {AsientoContableCabeceraPerfilModule} from '../asiento-contable-cabecera-perfil/asiento-contable-cabecera-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    AsientoContableCabeceraTablaComponent
  ],
  exports: [
    AsientoContableCabeceraTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    AsientoContableCabeceraPerfilModule,
    FormContainerModule,
    RippleModule,
    PipesModule
  ],
})
export class AsientoContableCabeceraTablaModule {
}
