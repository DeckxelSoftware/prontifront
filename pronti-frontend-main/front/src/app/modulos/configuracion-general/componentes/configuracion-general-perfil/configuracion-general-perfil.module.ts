import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfiguracionGeneralPerfilComponent} from './configuracion-general-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    ConfiguracionGeneralPerfilComponent
  ],
  exports: [
    ConfiguracionGeneralPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class ConfiguracionGeneralPerfilModule {
}
