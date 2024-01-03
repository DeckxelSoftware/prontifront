import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CobroPerfilComponent} from './cobro-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    CobroPerfilComponent
  ],
  exports: [
    CobroPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class CobroPerfilModule {
}
