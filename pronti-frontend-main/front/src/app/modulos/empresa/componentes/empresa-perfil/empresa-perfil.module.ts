import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmpresaPerfilComponent} from './empresa-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    EmpresaPerfilComponent
  ],
  exports: [
    EmpresaPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class EmpresaPerfilModule {
}
