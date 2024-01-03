import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistorialLaboralPerfilComponent} from './historial-laboral-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    HistorialLaboralPerfilComponent
  ],
  exports: [
    HistorialLaboralPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class HistorialLaboralPerfilModule {
}
