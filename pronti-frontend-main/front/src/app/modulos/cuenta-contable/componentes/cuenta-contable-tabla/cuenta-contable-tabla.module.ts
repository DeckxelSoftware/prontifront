import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CuentaContableTablaComponent} from './cuenta-contable-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {CuentaContablePerfilModule} from '../cuenta-contable-perfil/cuenta-contable-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    CuentaContableTablaComponent
  ],
  exports: [
    CuentaContableTablaComponent,
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
    PipesModule
  ],
})
export class CuentaContableTablaModule {
}
