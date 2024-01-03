import {CommonModule} from '@angular/common';
import {PrestamoRoutingModule} from '../prestamo-routing.module';
import {PrestamoPerfilModule} from '../componentes/prestamo-perfil/prestamo-perfil.module';
import {PrestamoTablaModule} from '../componentes/prestamo-tabla/prestamo-tabla.module';
import {HttpPrestamoModule} from '../servicios/http-prestamo-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpTrabajadorModule} from '../../trabajador/servicios/http-trabajador-module';

export const PRESTAMO_IMPORTS = [
  CommonModule,
  PrestamoRoutingModule,
  PrestamoPerfilModule,
  PrestamoTablaModule,
  HttpPrestamoModule,
  RouteHeaderModule,
  MatCardModule,
  HttpTrabajadorModule,
]
