import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FacturaPerfilComponent} from './factura-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    FacturaPerfilComponent
  ],
  exports: [
    FacturaPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class FacturaPerfilModule {
}
