import {CommonModule} from '@angular/common';
import {RolRoutingModule} from '../rol-routing.module';
import {RolPerfilModule} from '../componentes/rol-perfil/rol-perfil.module';
import {RolTablaModule} from '../componentes/rol-tabla/rol-tabla.module';
import {HttpRolModule} from '../servicios/http-rol-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const ROL_IMPORTS = [
  CommonModule,
  RolRoutingModule,
  RolPerfilModule,
  RolTablaModule,
  HttpRolModule,
  RouteHeaderModule,
  MatCardModule,
]
