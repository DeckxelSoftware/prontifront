import {CommonModule} from '@angular/common';
import {SriGastosRoutingModule} from '../sri-gastos-routing.module';
import {SriGastosPerfilModule} from '../componentes/sri-gastos-perfil/sri-gastos-perfil.module';
import {SriGastosTablaModule} from '../componentes/sri-gastos-tabla/sri-gastos-tabla.module';
import {HttpSriGastosModule} from '../servicios/http-sri-gastos-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from "../../../componentes/routes/route-header/route-header.module";

export const SRI_GASTOS_IMPORTS = [
  CommonModule,
  SriGastosRoutingModule,
  SriGastosPerfilModule,
  SriGastosTablaModule,
  HttpSriGastosModule,
  RouteHeaderModule,
  MatCardModule,
]
