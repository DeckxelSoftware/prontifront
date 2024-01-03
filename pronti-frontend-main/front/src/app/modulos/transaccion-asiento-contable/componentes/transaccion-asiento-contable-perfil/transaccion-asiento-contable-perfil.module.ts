import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransaccionAsientoContablePerfilComponent} from './transaccion-asiento-contable-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    TransaccionAsientoContablePerfilComponent
  ],
  exports: [
    TransaccionAsientoContablePerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class TransaccionAsientoContablePerfilModule {
}
