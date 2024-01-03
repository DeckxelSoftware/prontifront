import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BancoPerfilComponent} from './banco-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    BancoPerfilComponent
  ],
  exports: [
    BancoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class BancoPerfilModule {
}
