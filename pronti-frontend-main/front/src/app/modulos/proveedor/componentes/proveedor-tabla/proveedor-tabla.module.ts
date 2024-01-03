import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProveedorTablaComponent} from './proveedor-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {ProveedorPerfilModule} from '../proveedor-perfil/proveedor-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {PipesModule} from '../../../../pipes/pipes.module';
import {HttpUsuarioModule} from "../../../usuario/servicios/http-usuario-module";
import {HttpEmpresaModule} from "../../../empresa/servicios/http-empresa-module";


@NgModule({
  declarations: [
    ProveedorTablaComponent
  ],
  exports: [
    ProveedorTablaComponent,
    HttpUsuarioModule,
    HttpEmpresaModule,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    ProveedorPerfilModule,
    FormContainerModule,
    PipesModule
  ],
})
export class ProveedorTablaModule {
}
