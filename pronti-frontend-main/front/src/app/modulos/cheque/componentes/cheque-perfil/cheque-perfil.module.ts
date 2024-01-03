import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChequePerfilComponent} from './cheque-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    ChequePerfilComponent
  ],
  exports: [
    ChequePerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class ChequePerfilModule {
}
