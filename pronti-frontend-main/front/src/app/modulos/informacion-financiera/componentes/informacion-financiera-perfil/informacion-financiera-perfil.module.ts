import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InformacionFinancieraPerfilComponent} from './informacion-financiera-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    InformacionFinancieraPerfilComponent
  ],
  exports: [
    InformacionFinancieraPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class InformacionFinancieraPerfilModule {
}
