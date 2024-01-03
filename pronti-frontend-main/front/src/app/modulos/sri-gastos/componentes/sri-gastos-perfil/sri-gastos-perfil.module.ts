import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SriGastosPerfilComponent} from './sri-gastos-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    SriGastosPerfilComponent
  ],
  exports: [
    SriGastosPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class SriGastosPerfilModule {
}
