import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArchivoPerfilComponent} from './archivo-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    ArchivoPerfilComponent
  ],
  exports: [
    ArchivoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class ArchivoPerfilModule {
}
