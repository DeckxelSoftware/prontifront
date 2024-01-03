import {CommonModule} from '@angular/common';
import {RolUsuarioRoutingModule} from '../rol-usuario-routing.module';
import {RolUsuarioPerfilModule} from '../componentes/rol-usuario-perfil/rol-usuario-perfil.module';
import {RolUsuarioTablaModule} from '../componentes/rol-usuario-tabla/rol-usuario-tabla.module';
import {HttpRolUsuarioModule} from '../servicios/http-rol-usuario-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const ROL_USUARIO_IMPORTS = [
  CommonModule,
  RolUsuarioRoutingModule,
  RolUsuarioPerfilModule,
  RolUsuarioTablaModule,
  HttpRolUsuarioModule,
  RouteHeaderModule,
  MatCardModule,
]
