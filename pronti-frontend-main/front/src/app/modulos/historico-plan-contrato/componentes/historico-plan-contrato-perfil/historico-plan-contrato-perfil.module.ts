import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoricoPlanContratoPerfilComponent} from './historico-plan-contrato-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    HistoricoPlanContratoPerfilComponent
  ],
  exports: [
    HistoricoPlanContratoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class HistoricoPlanContratoPerfilModule {
}
