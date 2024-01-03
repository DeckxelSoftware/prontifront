import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PermisoPerfilComponent} from './permiso-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    PermisoPerfilComponent
  ],
  exports: [
    PermisoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class PermisoPerfilModule {
}
