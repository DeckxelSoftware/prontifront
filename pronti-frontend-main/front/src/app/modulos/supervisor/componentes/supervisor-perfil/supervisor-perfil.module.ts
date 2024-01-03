import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SupervisorPerfilComponent} from './supervisor-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    SupervisorPerfilComponent
  ],
  exports: [
    SupervisorPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class SupervisorPerfilModule {
}
