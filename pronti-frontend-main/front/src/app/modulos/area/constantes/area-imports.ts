import {CommonModule} from '@angular/common';
import {AreaRoutingModule} from '../area-routing.module';
import {AreaPerfilModule} from '../componentes/area-perfil/area-perfil.module';
import {AreaTablaModule} from '../componentes/area-tabla/area-tabla.module';
import {HttpAreaModule} from '../servicios/http-area-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const AREA_IMPORTS = [
  CommonModule,
  AreaRoutingModule,
  AreaPerfilModule,
  AreaTablaModule,
  HttpAreaModule,
  RouteHeaderModule,
  MatCardModule,
]
