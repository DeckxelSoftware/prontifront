import {CommonModule} from '@angular/common';
import {ArticuloRoutingModule} from '../articulo-routing.module';
import {ArticuloPerfilModule} from '../componentes/articulo-perfil/articulo-perfil.module';
import {ArticuloTablaModule} from '../componentes/articulo-tabla/articulo-tabla.module';
import {HttpArticuloModule} from '../servicios/http-articulo-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from "../../../componentes/routes/route-header/route-header.module";

export const ARTICULO_IMPORTS = [
  CommonModule,
  ArticuloRoutingModule,
  ArticuloPerfilModule,
  ArticuloTablaModule,
  HttpArticuloModule,
  RouteHeaderModule,
  MatCardModule,
]
