import {CommonModule} from '@angular/common';
import {RolPermisoRoutingModule} from '../rol-permiso-routing.module';
import {RolPermisoPerfilModule} from '../componentes/rol-permiso-perfil/rol-permiso-perfil.module';
import {RolPermisoTablaModule} from '../componentes/rol-permiso-tabla/rol-permiso-tabla.module';
import {HttpRolPermisoModule} from '../servicios/http-rol-permiso-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const ROL_PERMISO_IMPORTS = [
  CommonModule,
  RolPermisoRoutingModule,
  RolPermisoPerfilModule,
  RolPermisoTablaModule,
  HttpRolPermisoModule,
  RouteHeaderModule,
  MatCardModule,
]
