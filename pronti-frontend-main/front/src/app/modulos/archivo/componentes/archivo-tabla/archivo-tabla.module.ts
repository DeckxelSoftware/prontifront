import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArchivoTablaComponent} from './archivo-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {ArchivoPerfilModule} from '../archivo-perfil/archivo-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    ArchivoTablaComponent
  ],
  exports: [
    ArchivoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    ArchivoPerfilModule,
    FormContainerModule
  ],
})
export class ArchivoTablaModule {
}
