import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsuarioPerfilComponent} from './usuario-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    UsuarioPerfilComponent
  ],
  exports: [
    UsuarioPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class UsuarioPerfilModule {
}
