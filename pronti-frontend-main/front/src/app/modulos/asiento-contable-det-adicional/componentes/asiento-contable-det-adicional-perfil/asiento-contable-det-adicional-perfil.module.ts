import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AsientoContableDetAdicionalPerfilComponent} from './asiento-contable-det-adicional-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    AsientoContableDetAdicionalPerfilComponent
  ],
  exports: [
    AsientoContableDetAdicionalPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class AsientoContableDetAdicionalPerfilModule {
}
