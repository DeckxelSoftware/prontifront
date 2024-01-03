import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolPagoPerfilComponent} from './rol-pago-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    RolPagoPerfilComponent
  ],
  exports: [
    RolPagoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class RolPagoPerfilModule {
}
