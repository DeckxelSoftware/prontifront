import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RolPerfilComponent} from './rol-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    RolPerfilComponent
  ],
  exports: [
    RolPerfilComponent
  ],
    imports: [
        CommonModule,
        ListInfoModule,
        ListInfoModule
    ]
})
export class RolPerfilModule {
}
