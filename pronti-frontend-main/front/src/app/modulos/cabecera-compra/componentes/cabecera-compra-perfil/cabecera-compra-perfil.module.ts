import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CabeceraCompraPerfilComponent} from './cabecera-compra-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    CabeceraCompraPerfilComponent
  ],
  exports: [
    CabeceraCompraPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class CabeceraCompraPerfilModule {
}
