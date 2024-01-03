import {CommonModule} from '@angular/common';
import {LicitacionRoutingModule} from '../licitacion-routing.module';
import {LicitacionPerfilModule} from '../componentes/licitacion-perfil/licitacion-perfil.module';
import {LicitacionTablaModule} from '../componentes/licitacion-tabla/licitacion-tabla.module';
import {HttpLicitacionModule} from '../servicios/http-licitacion-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import { LicitacionPreasambleaTablaModule } from '../componentes/licitacion-preasamblea-tabla/licitacion-preasamblea-tabla.module';

export const LICITACION_IMPORTS = [
  CommonModule,
  LicitacionRoutingModule,
  LicitacionPerfilModule,
  LicitacionTablaModule,
  LicitacionPreasambleaTablaModule,
  HttpLicitacionModule,
  RouteHeaderModule,
  MatCardModule,
]
