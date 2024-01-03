import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TrabajadorPerfilComponent} from './trabajador-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';
import {PipesModule} from '../../../../pipes/pipes.module';


@NgModule({
  declarations: [
    TrabajadorPerfilComponent
  ],
  exports: [
    TrabajadorPerfilComponent
  ],
    imports: [
        CommonModule,
        ListInfoModule,
        PipesModule
    ]
})
export class TrabajadorPerfilModule {
}
