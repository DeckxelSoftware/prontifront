import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Pagos1PerfilComponent} from './pagos1-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    Pagos1PerfilComponent
  ],
  exports: [
    Pagos1PerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class Pagos1PerfilModule {
}
