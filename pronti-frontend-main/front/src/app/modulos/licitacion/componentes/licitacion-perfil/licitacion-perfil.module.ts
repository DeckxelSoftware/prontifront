import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LicitacionPerfilComponent} from './licitacion-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    LicitacionPerfilComponent
  ],
  exports: [
    LicitacionPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class LicitacionPerfilModule {
}
