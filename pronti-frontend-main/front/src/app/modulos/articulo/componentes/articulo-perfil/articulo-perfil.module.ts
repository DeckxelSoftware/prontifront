import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticuloPerfilComponent} from './articulo-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    ArticuloPerfilComponent
  ],
  exports: [
    ArticuloPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class ArticuloPerfilModule {
}
