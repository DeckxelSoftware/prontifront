import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientePerfilComponent} from './cliente-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    ClientePerfilComponent
  ],
  exports: [
    ClientePerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class ClientePerfilModule {
}
