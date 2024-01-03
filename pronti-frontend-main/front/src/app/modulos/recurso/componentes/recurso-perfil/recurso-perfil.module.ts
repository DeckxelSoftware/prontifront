import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecursoPerfilComponent} from './recurso-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    RecursoPerfilComponent
  ],
  exports: [
    RecursoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class RecursoPerfilModule {
}
