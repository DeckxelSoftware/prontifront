import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RefinanciamientoPerfilComponent} from './refinanciamiento-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    RefinanciamientoPerfilComponent
  ],
  exports: [
    RefinanciamientoPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class RefinanciamientoPerfilModule {
}
