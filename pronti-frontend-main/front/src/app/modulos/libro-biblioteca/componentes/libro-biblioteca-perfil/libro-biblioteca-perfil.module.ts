import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LibroBibliotecaPerfilComponent} from './libro-biblioteca-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    LibroBibliotecaPerfilComponent
  ],
  exports: [
    LibroBibliotecaPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class LibroBibliotecaPerfilModule {
}
