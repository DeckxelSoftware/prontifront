import {CommonModule} from '@angular/common';
import {CobroRoutingModule} from '../cobro-routing.module';
import {CobroPerfilModule} from '../componentes/cobro-perfil/cobro-perfil.module';
import {CobroTablaModule} from '../componentes/cobro-tabla/cobro-tabla.module';
import {HttpCobroModule} from '../servicios/http-cobro-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from "../../../componentes/routes/route-header/route-header.module";

export const COBRO_IMPORTS = [
  CommonModule,
  CobroRoutingModule,
  CobroPerfilModule,
  CobroTablaModule,
  HttpCobroModule,
  RouteHeaderModule,
  MatCardModule,
]
