import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolPermisoTablaComponent} from './rol-permiso-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {RolPermisoPerfilModule} from '../rol-permiso-perfil/rol-permiso-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    RolPermisoTablaComponent
  ],
  exports: [
    RolPermisoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    RolPermisoPerfilModule,
    FormContainerModule
  ],
})
export class RolPermisoTablaModule {
}
