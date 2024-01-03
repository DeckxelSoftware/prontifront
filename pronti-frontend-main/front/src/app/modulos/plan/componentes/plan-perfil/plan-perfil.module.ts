import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanPerfilComponent} from './plan-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    PlanPerfilComponent
  ],
  exports: [
    PlanPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class PlanPerfilModule {
}
