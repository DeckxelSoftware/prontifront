import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Pagos2PerfilComponent} from './pagos2-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    Pagos2PerfilComponent
  ],
  exports: [
    Pagos2PerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class Pagos2PerfilModule {
}
