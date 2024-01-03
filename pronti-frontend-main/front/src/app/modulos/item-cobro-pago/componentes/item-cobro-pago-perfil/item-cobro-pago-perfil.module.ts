import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ItemCobroPagoPerfilComponent} from './item-cobro-pago-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    ItemCobroPagoPerfilComponent
  ],
  exports: [
    ItemCobroPagoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class ItemCobroPagoPerfilModule {
}
