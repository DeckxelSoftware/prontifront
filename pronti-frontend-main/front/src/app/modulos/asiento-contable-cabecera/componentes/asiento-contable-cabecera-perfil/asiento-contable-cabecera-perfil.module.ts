import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AsientoContableCabeceraPerfilComponent} from './asiento-contable-cabecera-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    AsientoContableCabeceraPerfilComponent
  ],
  exports: [
    AsientoContableCabeceraPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class AsientoContableCabeceraPerfilModule {
}
