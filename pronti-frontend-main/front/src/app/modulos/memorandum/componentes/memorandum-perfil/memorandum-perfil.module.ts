import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MemorandumPerfilComponent} from './memorandum-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    MemorandumPerfilComponent
  ],
  exports: [
    MemorandumPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class MemorandumPerfilModule {
}
