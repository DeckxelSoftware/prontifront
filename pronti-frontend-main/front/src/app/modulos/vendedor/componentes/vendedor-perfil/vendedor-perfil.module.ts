import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VendedorPerfilComponent} from './vendedor-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    VendedorPerfilComponent
  ],
  exports: [
    VendedorPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class VendedorPerfilModule {
}
