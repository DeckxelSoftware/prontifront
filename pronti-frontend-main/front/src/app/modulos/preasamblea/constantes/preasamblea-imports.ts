import {CommonModule} from '@angular/common';
import {PreasambleaRoutingModule} from '../preasamblea-routing.module';
import {PreasambleaPerfilModule} from '../componentes/preasamblea-perfil/preasamblea-perfil.module';
import {PreasambleaTablaModule} from '../componentes/preasamblea-tabla/preasamblea-tabla.module';
import {HttpPreasambleaModule} from '../servicios/http-preasamblea-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from "../../../componentes/routes/route-header/route-header.module";

export const PREASAMBLEA_IMPORTS = [
  CommonModule,
  PreasambleaRoutingModule,
  PreasambleaPerfilModule,
  PreasambleaTablaModule,
  HttpPreasambleaModule,
  RouteHeaderModule,
  MatCardModule,
]
