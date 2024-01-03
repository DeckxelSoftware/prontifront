import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PermisoTablaComponent} from './permiso-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {PermisoPerfilModule} from '../permiso-perfil/permiso-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';


@NgModule({
  declarations: [
    PermisoTablaComponent
  ],
  exports: [
    PermisoTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    PermisoPerfilModule,
    FormContainerModule
  ],
})
export class PermisoTablaModule {
}
