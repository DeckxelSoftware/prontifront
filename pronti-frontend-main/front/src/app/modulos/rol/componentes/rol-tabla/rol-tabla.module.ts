import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolTablaComponent} from './rol-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {RolPerfilModule} from '../rol-perfil/rol-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RippleModule} from 'primeng/ripple';
import {RolPermisoTablaModule} from '../../../rol-permiso/componentes/rol-permiso-tabla/rol-permiso-tabla.module';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    RolTablaComponent
  ],
  exports: [
    RolTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    RolPerfilModule,
    FormContainerModule,
    RippleModule,
    RolPermisoTablaModule,
    PipesModule
  ],
})
export class RolTablaModule {
}
