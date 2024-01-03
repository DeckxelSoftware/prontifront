import {CommonModule} from '@angular/common';
import {LineaImpuestoRoutingModule} from '../linea-impuesto-routing.module';
import {LineaImpuestoPerfilModule} from '../componentes/linea-impuesto-perfil/linea-impuesto-perfil.module';
import {LineaImpuestoTablaModule} from '../componentes/linea-impuesto-tabla/linea-impuesto-tabla.module';
import {HttpLineaImpuestoModule} from '../servicios/http-linea-impuesto-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from "../../../componentes/routes/route-header/route-header.module";

export const LINEA_IMPUESTO_IMPORTS = [
  CommonModule,
  LineaImpuestoRoutingModule,
  LineaImpuestoPerfilModule,
  LineaImpuestoTablaModule,
  HttpLineaImpuestoModule,
  RouteHeaderModule,
  MatCardModule,
]
