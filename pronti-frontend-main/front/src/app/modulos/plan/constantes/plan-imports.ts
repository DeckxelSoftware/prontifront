import {CommonModule} from '@angular/common';
import {PlanRoutingModule} from '../plan-routing.module';
import {PlanPerfilModule} from '../componentes/plan-perfil/plan-perfil.module';
import {PlanTablaModule} from '../componentes/plan-tabla/plan-tabla.module';
import {HttpPlanModule} from '../servicios/http-plan-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpConfiguracionGeneralModule} from '../../configuracion-general/servicios/http-configuracion-general-module';

export const PLAN_IMPORTS = [
  CommonModule,
  PlanRoutingModule,
  PlanPerfilModule,
  PlanTablaModule,
  HttpPlanModule,
  RouteHeaderModule,
  MatCardModule,
  HttpConfiguracionGeneralModule,
]
