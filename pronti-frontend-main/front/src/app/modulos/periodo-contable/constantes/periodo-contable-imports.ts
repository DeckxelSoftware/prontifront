import {CommonModule} from '@angular/common';
import {PeriodoContableRoutingModule} from '../periodo-contable-routing.module';
import {PeriodoContablePerfilModule} from '../componentes/periodo-contable-perfil/periodo-contable-perfil.module';
import {PeriodoContableTablaModule} from '../componentes/periodo-contable-tabla/periodo-contable-tabla.module';
import {HttpPeriodoContableModule} from '../servicios/http-periodo-contable-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {PipesModule} from '../../../pipes/pipes.module';

export const PERIODO_CONTABLE_IMPORTS = [
  CommonModule,
  PeriodoContableRoutingModule,
  PeriodoContablePerfilModule,
  PeriodoContableTablaModule,
  HttpPeriodoContableModule,
  RouteHeaderModule,
  MatCardModule,
  PipesModule,
]
