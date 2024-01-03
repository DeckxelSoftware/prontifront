import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CuentaBancariaEmpresaPerfilComponent} from './cuenta-bancaria-empresa-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    CuentaBancariaEmpresaPerfilComponent
  ],
  exports: [
    CuentaBancariaEmpresaPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class CuentaBancariaEmpresaPerfilModule {
}
