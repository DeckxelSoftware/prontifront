import {CommonModule} from '@angular/common';
import {PermisoRoutingModule} from '../permiso-routing.module';
import {PermisoPerfilModule} from '../componentes/permiso-perfil/permiso-perfil.module';
import {PermisoTablaModule} from '../componentes/permiso-tabla/permiso-tabla.module';
import {HttpPermisoModule} from '../servicios/http-permiso-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const PERMISO_IMPORTS = [
  CommonModule,
  PermisoRoutingModule,
  PermisoPerfilModule,
  PermisoTablaModule,
  HttpPermisoModule,
  RouteHeaderModule,
  MatCardModule,
]
