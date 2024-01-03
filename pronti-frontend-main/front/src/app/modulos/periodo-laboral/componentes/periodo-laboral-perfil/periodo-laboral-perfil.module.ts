import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeriodoLaboralPerfilComponent} from './periodo-laboral-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    PeriodoLaboralPerfilComponent
  ],
  exports: [
    PeriodoLaboralPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class PeriodoLaboralPerfilModule {
}
