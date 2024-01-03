import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolUsuarioTablaComponent} from './rol-usuario-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {RolUsuarioPerfilModule} from '../rol-usuario-perfil/rol-usuario-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {HttpUsuarioModule} from '../../../usuario/servicios/http-usuario-module';
import {HttpRolUsuarioModule} from '../../servicios/http-rol-usuario-module';


@NgModule({
  declarations: [
    RolUsuarioTablaComponent
  ],
  exports: [
    RolUsuarioTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    RolUsuarioPerfilModule,
    FormContainerModule,
    HttpRolUsuarioModule

  ],
})
export class RolUsuarioTablaModule {
}
