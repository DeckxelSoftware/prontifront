import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContratoPerfilComponent} from './contrato-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    ContratoPerfilComponent
  ],
  exports: [
    ContratoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class ContratoPerfilModule {
}
