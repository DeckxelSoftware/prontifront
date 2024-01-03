import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubgrupoContablePerfilComponent} from './subgrupo-contable-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    SubgrupoContablePerfilComponent
  ],
  exports: [
    SubgrupoContablePerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class SubgrupoContablePerfilModule {
}
