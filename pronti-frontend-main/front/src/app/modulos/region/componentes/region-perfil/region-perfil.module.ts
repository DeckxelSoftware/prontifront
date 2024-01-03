import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegionPerfilComponent} from './region-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    RegionPerfilComponent
  ],
  exports: [
    RegionPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class RegionPerfilModule {
}
