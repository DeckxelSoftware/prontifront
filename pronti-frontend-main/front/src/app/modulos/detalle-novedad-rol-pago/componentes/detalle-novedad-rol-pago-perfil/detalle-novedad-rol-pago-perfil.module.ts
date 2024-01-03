import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetalleNovedadRolPagoPerfilComponent} from './detalle-novedad-rol-pago-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    DetalleNovedadRolPagoPerfilComponent
  ],
  exports: [
    DetalleNovedadRolPagoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class DetalleNovedadRolPagoPerfilModule {
}
