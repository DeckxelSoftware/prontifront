import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeriodoContablePerfilComponent} from './periodo-contable-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    PeriodoContablePerfilComponent
  ],
  exports: [
    PeriodoContablePerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class PeriodoContablePerfilModule {
}
