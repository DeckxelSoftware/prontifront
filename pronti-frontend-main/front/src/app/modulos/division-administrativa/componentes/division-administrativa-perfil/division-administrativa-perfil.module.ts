import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DivisionAdministrativaPerfilComponent} from './division-administrativa-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    DivisionAdministrativaPerfilComponent
  ],
  exports: [
    DivisionAdministrativaPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class DivisionAdministrativaPerfilModule {
}
