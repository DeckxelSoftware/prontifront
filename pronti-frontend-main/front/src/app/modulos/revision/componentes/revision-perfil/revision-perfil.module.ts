import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RevisionPerfilComponent} from './revision-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    RevisionPerfilComponent
  ],
  exports: [
    RevisionPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class RevisionPerfilModule {
}
