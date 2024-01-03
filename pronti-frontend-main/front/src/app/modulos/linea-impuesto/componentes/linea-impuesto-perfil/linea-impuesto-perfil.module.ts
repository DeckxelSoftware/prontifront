import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LineaImpuestoPerfilComponent} from './linea-impuesto-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    LineaImpuestoPerfilComponent
  ],
  exports: [
    LineaImpuestoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class LineaImpuestoPerfilModule {
}
