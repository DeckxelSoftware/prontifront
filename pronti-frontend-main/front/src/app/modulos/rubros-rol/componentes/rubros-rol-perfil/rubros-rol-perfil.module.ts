import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RubrosRolPerfilComponent} from './rubros-rol-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    RubrosRolPerfilComponent
  ],
  exports: [
    RubrosRolPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class RubrosRolPerfilModule {
}
