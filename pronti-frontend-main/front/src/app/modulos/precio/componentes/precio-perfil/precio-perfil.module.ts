import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrecioPerfilComponent} from './precio-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    PrecioPerfilComponent
  ],
  exports: [
    PrecioPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class PrecioPerfilModule {
}
