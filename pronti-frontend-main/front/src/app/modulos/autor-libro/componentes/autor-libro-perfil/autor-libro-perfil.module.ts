import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutorLibroPerfilComponent} from './autor-libro-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    AutorLibroPerfilComponent
  ],
  exports: [
    AutorLibroPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class AutorLibroPerfilModule {
}
