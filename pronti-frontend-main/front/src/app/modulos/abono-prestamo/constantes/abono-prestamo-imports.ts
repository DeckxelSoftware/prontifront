import {CommonModule} from '@angular/common';
import {AbonoPrestamoRoutingModule} from '../abono-prestamo-routing.module';
import {AbonoPrestamoPerfilModule} from '../componentes/abono-prestamo-perfil/abono-prestamo-perfil.module';
import {AbonoPrestamoTablaModule} from '../componentes/abono-prestamo-tabla/abono-prestamo-tabla.module';
import {HttpAbonoPrestamoModule} from '../servicios/http-abono-prestamo-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const ABONO_PRESTAMO_IMPORTS = [
  CommonModule,
  AbonoPrestamoRoutingModule,
  AbonoPrestamoPerfilModule,
  AbonoPrestamoTablaModule,
  HttpAbonoPrestamoModule,
  RouteHeaderModule,
  MatCardModule,
]
