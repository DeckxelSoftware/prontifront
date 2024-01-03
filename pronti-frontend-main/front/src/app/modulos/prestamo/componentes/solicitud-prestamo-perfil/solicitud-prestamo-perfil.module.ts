import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SolicitudPrestamoPerfilComponent} from './solicitud-prestamo-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    SolicitudPrestamoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ],
  exports: [
    SolicitudPrestamoPerfilComponent
  ]
})
export class SolicitudPrestamoPerfilModule {
}
