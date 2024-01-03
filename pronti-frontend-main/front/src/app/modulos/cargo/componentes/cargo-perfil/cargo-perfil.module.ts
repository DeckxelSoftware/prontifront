
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CargoPerfilComponent} from './cargo-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    CargoPerfilComponent
  ],
  exports: [
    CargoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class CargoPerfilModule {
}
