import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GrupoContablePerfilComponent} from './grupo-contable-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    GrupoContablePerfilComponent
  ],
  exports: [
    GrupoContablePerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class GrupoContablePerfilModule {
}
