import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProveedorPerfilComponent} from './proveedor-perfil.component';
import {ListInfoModule} from '../../../../componentes/profile/list-info/list-info.module';


@NgModule({
  declarations: [
    ProveedorPerfilComponent
  ],
  exports: [
    ProveedorPerfilComponent
  ],
  imports: [
    CommonModule,
    ListInfoModule
  ]
})
export class ProveedorPerfilModule {
}
