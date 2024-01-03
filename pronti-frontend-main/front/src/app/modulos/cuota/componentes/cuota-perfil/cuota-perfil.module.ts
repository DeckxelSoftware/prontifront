import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CuotaPerfilComponent} from './cuota-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    CuotaPerfilComponent
  ],
  exports: [
    CuotaPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class CuotaPerfilModule {
}
