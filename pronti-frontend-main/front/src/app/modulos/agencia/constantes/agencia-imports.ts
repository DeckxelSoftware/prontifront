import {CommonModule} from '@angular/common';
import {AgenciaRoutingModule} from '../agencia-routing.module';
import {AgenciaPerfilModule} from '../componentes/agencia-perfil/agencia-perfil.module';
import {AgenciaTablaModule} from '../componentes/agencia-tabla/agencia-tabla.module';
import {HttpAgenciaModule} from '../servicios/http-agencia-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpListaValoresDetalleModule} from '../../lista-valores-detalle/servicios/http-lista-valores-detalle-module';

export const AGENCIA_IMPORTS = [
  CommonModule,
  AgenciaRoutingModule,
  AgenciaPerfilModule,
  AgenciaTablaModule,
  HttpAgenciaModule,
  RouteHeaderModule,
  MatCardModule,
  HttpAgenciaModule,
  HttpListaValoresDetalleModule,
]
