import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ImpuestoRentaPerfilComponent} from './impuesto-renta-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    ImpuestoRentaPerfilComponent
  ],
  exports: [
    ImpuestoRentaPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class ImpuestoRentaPerfilModule {
}
