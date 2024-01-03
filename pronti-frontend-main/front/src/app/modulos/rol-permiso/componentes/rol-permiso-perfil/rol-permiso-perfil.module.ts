import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolPermisoPerfilComponent} from './rol-permiso-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    RolPermisoPerfilComponent
  ],
  exports: [
    RolPermisoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class RolPermisoPerfilModule {
}
