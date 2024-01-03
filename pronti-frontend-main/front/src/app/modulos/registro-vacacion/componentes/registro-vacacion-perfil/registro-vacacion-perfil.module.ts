import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistroVacacionPerfilComponent} from './registro-vacacion-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    RegistroVacacionPerfilComponent
  ],
  exports: [
    RegistroVacacionPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class RegistroVacacionPerfilModule {
}
