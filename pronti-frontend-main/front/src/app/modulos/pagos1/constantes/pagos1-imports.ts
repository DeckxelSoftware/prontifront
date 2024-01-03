import {CommonModule} from '@angular/common';
import {Pagos1RoutingModule} from '../pagos1-routing.module';
import {Pagos1PerfilModule} from '../componentes/pagos1-perfil/pagos1-perfil.module';
import {Pagos1TablaModule} from '../componentes/pagos1-tabla/pagos1-tabla.module';
import {HttpPagos1Module} from '../servicios/http-pagos1-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from "../../../componentes/routes/route-header/route-header.module";

export const PAGOS_1_IMPORTS = [
  CommonModule,
  Pagos1RoutingModule,
  Pagos1PerfilModule,
  Pagos1TablaModule,
  HttpPagos1Module,
  RouteHeaderModule,
  MatCardModule,
]
