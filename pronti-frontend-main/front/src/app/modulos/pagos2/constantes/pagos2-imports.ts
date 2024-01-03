import { CommonModule } from '@angular/common';
import { Pagos2RoutingModule } from '../pagos2-routing.module';
import { Pagos2PerfilModule } from '../componentes/pagos2-perfil/pagos2-perfil.module';
import { Pagos2TablaModule } from '../componentes/pagos2-tabla/pagos2-tabla.module';
import { HttpPagos2Module } from '../servicios/http-pagos2-module';
import { MatCardModule } from '@angular/material/card';
import { RouteHeaderModule } from "../../../componentes/routes/route-header/route-header.module";
import { HttpPagos1Module } from '../../pagos1/servicios/http-pagos1-module';

export const PAGOS_2_IMPORTS = [
  CommonModule,
  Pagos2RoutingModule,
  Pagos2PerfilModule,
  Pagos2TablaModule,
  HttpPagos2Module,
  HttpPagos1Module,
  RouteHeaderModule,
  MatCardModule,
]
