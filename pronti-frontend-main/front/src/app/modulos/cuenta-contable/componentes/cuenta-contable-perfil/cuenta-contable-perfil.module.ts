import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CuentaContablePerfilComponent} from './cuenta-contable-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    CuentaContablePerfilComponent
  ],
  exports: [
    CuentaContablePerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class CuentaContablePerfilModule {
}
