import {CommonModule} from '@angular/common';
import {RubrosRolRoutingModule} from '../rubros-rol-routing.module';
import {RubrosRolPerfilModule} from '../componentes/rubros-rol-perfil/rubros-rol-perfil.module';
import {RubrosRolTablaModule} from '../componentes/rubros-rol-tabla/rubros-rol-tabla.module';
import {HttpRubrosRolModule} from '../servicios/http-rubros-rol-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const RUBROS_ROL_IMPORTS = [
  CommonModule,
  RubrosRolRoutingModule,
  RubrosRolPerfilModule,
  RubrosRolTablaModule,
  HttpRubrosRolModule,
  RouteHeaderModule,
  MatCardModule,
]
