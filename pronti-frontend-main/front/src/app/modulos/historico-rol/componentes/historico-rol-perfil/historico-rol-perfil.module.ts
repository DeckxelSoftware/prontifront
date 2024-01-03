import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoricoRolPerfilComponent} from './historico-rol-perfil.component';
import { ListInfoModule } from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    HistoricoRolPerfilComponent
  ],
  exports: [
    HistoricoRolPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class HistoricoRolPerfilModule {
}
