import {CommonModule} from '@angular/common';
import {PeriodoLaboralRoutingModule} from '../periodo-laboral-routing.module';
import {PeriodoLaboralPerfilModule} from '../componentes/periodo-laboral-perfil/periodo-laboral-perfil.module';
import {PeriodoLaboralTablaModule} from '../componentes/periodo-laboral-tabla/periodo-laboral-tabla.module';
import {HttpPeriodoLaboralModule} from '../servicios/http-periodo-laboral-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const PERIODO_LABORAL_IMPORTS = [
  CommonModule,
  PeriodoLaboralRoutingModule,
  PeriodoLaboralPerfilModule,
  PeriodoLaboralTablaModule,
  HttpPeriodoLaboralModule,
  RouteHeaderModule,
  MatCardModule,
]
