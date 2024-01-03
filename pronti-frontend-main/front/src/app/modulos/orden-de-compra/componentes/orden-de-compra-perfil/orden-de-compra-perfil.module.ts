import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrdenDeCompraPerfilComponent} from './orden-de-compra-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    OrdenDeCompraPerfilComponent
  ],
  exports: [
    OrdenDeCompraPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class OrdenDeCompraPerfilModule {
}
