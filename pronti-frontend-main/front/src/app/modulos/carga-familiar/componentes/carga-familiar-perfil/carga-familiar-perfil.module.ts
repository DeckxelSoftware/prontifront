import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CargaFamiliarPerfilComponent} from './carga-familiar-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    CargaFamiliarPerfilComponent
  ],
  exports: [
    CargaFamiliarPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class CargaFamiliarPerfilModule {
}
