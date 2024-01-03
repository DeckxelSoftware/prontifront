import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgenciaPerfilComponent} from './agencia-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    AgenciaPerfilComponent
  ],
  exports: [
    AgenciaPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class AgenciaPerfilModule {
}
