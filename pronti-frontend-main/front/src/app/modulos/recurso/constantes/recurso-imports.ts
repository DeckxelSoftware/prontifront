import {CommonModule} from '@angular/common';
import {RecursoRoutingModule} from '../recurso-routing.module';
import {RecursoPerfilModule} from '../componentes/recurso-perfil/recurso-perfil.module';
import {RecursoTablaModule} from '../componentes/recurso-tabla/recurso-tabla.module';
import {HttpRecursoModule} from '../servicios/http-recurso-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from "../../../componentes/routes/route-header/route-header.module";

export const RECURSO_IMPORTS = [
  CommonModule,
  RecursoRoutingModule,
  RecursoPerfilModule,
  RecursoTablaModule,
  HttpRecursoModule,
  RouteHeaderModule,
  MatCardModule,
]
