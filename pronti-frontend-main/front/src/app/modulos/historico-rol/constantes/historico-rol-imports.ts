import { CommonModule } from '@angular/common';
import { HistoricoRolRoutingModule } from '../historico-rol-routing.module';
import { HistoricoRolPerfilModule } from '../componentes/historico-rol-perfil/historico-rol-perfil.module';
import { HistoricoRolTablaModule } from '../componentes/historico-rol-tabla/historico-rol-tabla.module';
import { HttpHistoricoRolModule } from '../servicios/http-historico-rol-module';
import { MatCardModule } from '@angular/material/card';
import { RouteHeaderModule } from '../../../componentes/routes/route-header/route-header.module';
import { FormsModule } from '@angular/forms';
import { HttpPeriodoLaboralModule } from '../../periodo-laboral/servicios/http-periodo-laboral-module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HttpRolPagoModule } from '../../rol-pago/servicios/http-rol-pago-module';

export const HISTORICO_ROL_IMPORTS = [
  CommonModule,
  HistoricoRolRoutingModule,
  HistoricoRolPerfilModule,
  HistoricoRolTablaModule,
  HttpHistoricoRolModule,
  RouteHeaderModule,
  MatCardModule,
  FormsModule,
  HttpPeriodoLaboralModule,
  AutoCompleteModule,
  HttpRolPagoModule,



]
