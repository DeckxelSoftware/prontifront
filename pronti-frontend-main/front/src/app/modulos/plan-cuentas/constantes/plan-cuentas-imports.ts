import {CommonModule} from '@angular/common';
import {PlanCuentasRoutingModule} from '../plan-cuentas-routing.module';
import {PlanCuentasPerfilModule} from '../componentes/plan-cuentas-perfil/plan-cuentas-perfil.module';
import {PlanCuentasTablaModule} from '../componentes/plan-cuentas-tabla/plan-cuentas-tabla.module';
import {HttpPlanCuentasModule} from '../servicios/http-plan-cuentas-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const PLAN_CUENTAS_IMPORTS = [
  CommonModule,
  PlanCuentasRoutingModule,
  PlanCuentasPerfilModule,
  PlanCuentasTablaModule,
  HttpPlanCuentasModule,
  RouteHeaderModule,
  MatCardModule,
]
