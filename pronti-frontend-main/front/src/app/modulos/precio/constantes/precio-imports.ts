import {CommonModule} from '@angular/common';
import {PrecioRoutingModule} from '../precio-routing.module';
import {PrecioPerfilModule} from '../componentes/precio-perfil/precio-perfil.module';
import {PrecioTablaModule} from '../componentes/precio-tabla/precio-tabla.module';
import {HttpPrecioModule} from '../servicios/http-precio-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpConfiguracionGeneralModule} from '../../configuracion-general/servicios/http-configuracion-general-module';
import {HttpPlanModule} from '../../plan/servicios/http-plan-module';

export const PRECIO_IMPORTS = [
  CommonModule,
  PrecioRoutingModule,
  PrecioPerfilModule,
  PrecioTablaModule,
  HttpPrecioModule,
  RouteHeaderModule,
  MatCardModule,
  HttpConfiguracionGeneralModule,
  HttpPlanModule,
]
