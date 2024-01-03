import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListaValoresDetallePerfilComponent} from './lista-valores-detalle-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    ListaValoresDetallePerfilComponent
  ],
  exports: [
    ListaValoresDetallePerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class ListaValoresDetallePerfilModule {
}
