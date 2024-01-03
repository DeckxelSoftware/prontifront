import {CommonModule} from '@angular/common';
import {HistoricoPlanContratoPerfilModule} from '../componentes/historico-plan-contrato-perfil/historico-plan-contrato-perfil.module';
import {HistoricoPlanContratoTablaModule} from '../componentes/historico-plan-contrato-tabla/historico-plan-contrato-tabla.module';
import {HttpHistoricoPlanContratoModule} from '../servicios/http-historico-plan-contrato-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HistoricoPlanContratoRoutingModule} from '../historico-plan-contrato-routing.module';
import {HttpPlanModule} from '../../plan/servicios/http-plan-module';

export const HISTORICO_PLAN_CONTRATO_IMPORTS = [
  CommonModule,
  HistoricoPlanContratoRoutingModule,
  HistoricoPlanContratoPerfilModule,
  HistoricoPlanContratoTablaModule,
  HttpHistoricoPlanContratoModule,
  RouteHeaderModule,
  MatCardModule,
  HttpPlanModule,
]
