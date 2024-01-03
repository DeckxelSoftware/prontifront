import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotaCreditoPerfilComponent} from './nota-credito-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    NotaCreditoPerfilComponent
  ],
  exports: [
    NotaCreditoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class NotaCreditoPerfilModule {
}
