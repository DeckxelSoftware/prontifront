import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CargoVacacionPerfilComponent} from './cargo-vacacion-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    CargoVacacionPerfilComponent
  ],
  exports: [
    CargoVacacionPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class CargoVacacionPerfilModule {
}
