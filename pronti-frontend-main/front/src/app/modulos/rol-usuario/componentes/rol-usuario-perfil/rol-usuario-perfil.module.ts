import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolUsuarioPerfilComponent} from './rol-usuario-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    RolUsuarioPerfilComponent
  ],
  exports: [
    RolUsuarioPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class RolUsuarioPerfilModule {
}
