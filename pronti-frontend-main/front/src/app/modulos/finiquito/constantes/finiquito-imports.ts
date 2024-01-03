import {CommonModule} from '@angular/common';
import {FiniquitoRoutingModule} from '../finiquito-routing.module';
import {FiniquitoPerfilModule} from '../componentes/finiquito-perfil/finiquito-perfil.module';
import {FiniquitoTablaModule} from '../componentes/finiquito-tabla/finiquito-tabla.module';
import {HttpFiniquitoModule} from '../servicios/http-finiquito-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from "../../../componentes/routes/route-header/route-header.module";

export const FINIQUITO_IMPORTS = [
  CommonModule,
  FiniquitoRoutingModule,
  FiniquitoPerfilModule,
  FiniquitoTablaModule,
  HttpFiniquitoModule,
  RouteHeaderModule,
  MatCardModule,
]
