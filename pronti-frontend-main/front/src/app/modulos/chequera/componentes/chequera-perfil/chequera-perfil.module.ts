import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChequeraPerfilComponent} from './chequera-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    ChequeraPerfilComponent
  ],
  exports: [
    ChequeraPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class ChequeraPerfilModule {
}
