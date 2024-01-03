import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubgrupoContableTablaComponent} from './subgrupo-contable-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {SubgrupoContablePerfilModule} from '../subgrupo-contable-perfil/subgrupo-contable-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    SubgrupoContableTablaComponent
  ],
  exports: [
    SubgrupoContableTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    SubgrupoContablePerfilModule,
    FormContainerModule
  ],
})
export class SubgrupoContableTablaModule {
}
