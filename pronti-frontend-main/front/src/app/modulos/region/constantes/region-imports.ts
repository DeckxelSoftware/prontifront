import {CommonModule} from '@angular/common';
import {RegionRoutingModule} from '../region-routing.module';
import {RegionPerfilModule} from '../componentes/region-perfil/region-perfil.module';
import {RegionTablaModule} from '../componentes/region-tabla/region-tabla.module';
import {HttpRegionModule} from '../servicios/http-region-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const REGION_IMPORTS = [
  CommonModule,
  RegionRoutingModule,
  RegionPerfilModule,
  RegionTablaModule,
  HttpRegionModule,
  RouteHeaderModule,
  MatCardModule,
]
