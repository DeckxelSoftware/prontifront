import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClienteEnGrupoPerfilComponent} from './cliente-en-grupo-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    ClienteEnGrupoPerfilComponent
  ],
  exports: [
    ClienteEnGrupoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class ClienteEnGrupoPerfilModule {
}
