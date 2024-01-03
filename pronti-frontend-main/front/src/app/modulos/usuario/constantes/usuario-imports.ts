import {CommonModule} from '@angular/common';
import {UsuarioRoutingModule} from '../usuario-routing.module';
import {UsuarioPerfilModule} from '../componentes/usuario-perfil/usuario-perfil.module';
import {UsuarioTablaModule} from '../componentes/usuario-tabla/usuario-tabla.module';
import {HttpUsuarioModule} from '../servicios/http-usuario-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {RolModule} from '../../rol/rol.module';

export const USUARIO_IMPORTS = [
  CommonModule,
  UsuarioRoutingModule,
  UsuarioPerfilModule,
  UsuarioTablaModule,
  HttpUsuarioModule,
  RouteHeaderModule,
  MatCardModule,
  RolModule,
]
