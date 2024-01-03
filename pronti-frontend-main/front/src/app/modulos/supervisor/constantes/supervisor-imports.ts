import {CommonModule} from '@angular/common';
import {SupervisorRoutingModule} from '../supervisor-routing.module';
import {SupervisorPerfilModule} from '../componentes/supervisor-perfil/supervisor-perfil.module';
import {SupervisorTablaModule} from '../componentes/supervisor-tabla/supervisor-tabla.module';
import {HttpSupervisorModule} from '../servicios/http-supervisor-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpTrabajadorModule} from '../../trabajador/servicios/http-trabajador-module';
import {HttpAgenciaModule} from '../../agencia/servicios/http-agencia-module';

export const SUPERVISOR_IMPORTS = [
  CommonModule,
  SupervisorRoutingModule,
  SupervisorPerfilModule,
  SupervisorTablaModule,
  HttpSupervisorModule,
  RouteHeaderModule,
  MatCardModule,
  HttpTrabajadorModule,
  HttpAgenciaModule,
]
