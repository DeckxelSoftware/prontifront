import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FiniquitoPerfilComponent} from './finiquito-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    FiniquitoPerfilComponent
  ],
  exports: [
    FiniquitoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class FiniquitoPerfilModule {
}
