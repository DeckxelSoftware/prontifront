import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PerfilUsuarioPerfilComponent} from './perfil-usuario-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    PerfilUsuarioPerfilComponent
  ],
  exports: [
    PerfilUsuarioPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class PerfilUsuarioPerfilModule {
}
