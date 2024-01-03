import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanCuentasPerfilComponent} from './plan-cuentas-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    PlanCuentasPerfilComponent
  ],
  exports: [
    PlanCuentasPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class PlanCuentasPerfilModule {
}
