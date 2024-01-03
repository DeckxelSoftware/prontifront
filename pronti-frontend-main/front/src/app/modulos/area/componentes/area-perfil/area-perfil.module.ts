import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AreaPerfilComponent} from './area-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    AreaPerfilComponent
  ],
  exports: [
    AreaPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class AreaPerfilModule {
}
