import {CommonModule} from '@angular/common';
import {TrabajadorRoutingModule} from '../trabajador-routing.module';
import {TrabajadorPerfilModule} from '../componentes/trabajador-perfil/trabajador-perfil.module';
import {TrabajadorTablaModule} from '../componentes/trabajador-tabla/trabajador-tabla.module';
import {HttpTrabajadorModule} from '../servicios/http-trabajador-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpListaValoresDetalleModule} from '../../lista-valores-detalle/servicios/http-lista-valores-detalle-module';

export const TRABAJADOR_IMPORTS = [
  CommonModule,
  TrabajadorRoutingModule,
  TrabajadorPerfilModule,
  TrabajadorTablaModule,
  HttpTrabajadorModule,
  RouteHeaderModule,
  MatCardModule,
  HttpListaValoresDetalleModule,
]
