import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrupoContableTablaComponent} from './grupo-contable-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {GrupoContablePerfilModule} from '../grupo-contable-perfil/grupo-contable-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    GrupoContableTablaComponent
  ],
  exports: [
    GrupoContableTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    GrupoContablePerfilModule,
    FormContainerModule
  ],
})
export class GrupoContableTablaModule {
}
