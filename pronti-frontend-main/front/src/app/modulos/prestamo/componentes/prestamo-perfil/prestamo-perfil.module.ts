import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrestamoPerfilComponent} from './prestamo-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    PrestamoPerfilComponent
  ],
  exports: [
    PrestamoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class PrestamoPerfilModule {
}
