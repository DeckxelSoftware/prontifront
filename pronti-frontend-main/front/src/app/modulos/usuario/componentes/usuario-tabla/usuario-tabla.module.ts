import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsuarioTablaComponent} from './usuario-tabla.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {UsuarioPerfilModule} from '../usuario-perfil/usuario-perfil.module';
import {FormContainerModule} from '../../../../componentes/forms/form-container/form-container.module';
import {RolUsuarioTablaModule} from '../../../rol-usuario/componentes/rol-usuario-tabla/rol-usuario-tabla.module';
import {HttpUsuarioModule} from '../../servicios/http-usuario-module';
import {HttpListaValoresDetalleModule} from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-module';


@NgModule({
  declarations: [
    UsuarioTablaComponent
  ],
  exports: [
    UsuarioTablaComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    CardModule,
    ButtonModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    UsuarioPerfilModule,
    FormContainerModule,
    RolUsuarioTablaModule,
    HttpListaValoresDetalleModule,
  ],
})
export class UsuarioTablaModule {
}
