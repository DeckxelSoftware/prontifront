import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrupoPerfilComponent} from './grupo-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    GrupoPerfilComponent
  ],
  exports: [
    GrupoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class GrupoPerfilModule {
}
