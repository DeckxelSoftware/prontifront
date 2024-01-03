import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PreasambleaPerfilComponent} from './preasamblea-perfil.component';
import {ListInfoModule} from "../../../../componentes/profile/list-info/list-info.module";


@NgModule({
  declarations: [
    PreasambleaPerfilComponent
  ],
  exports: [
    PreasambleaPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class PreasambleaPerfilModule {
}
