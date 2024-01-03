import {CommonModule} from '@angular/common';
import {DetalleNovedadRolPagoRoutingModule} from '../detalle-novedad-rol-pago-routing.module';
import {DetalleNovedadRolPagoPerfilModule} from '../componentes/detalle-novedad-rol-pago-perfil/detalle-novedad-rol-pago-perfil.module';
import {HttpDetalleNovedadRolPagoModule} from '../servicios/http-detalle-novedad-rol-pago-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpRubrosRolModule} from '../../rubros-rol/servicios/http-rubros-rol-module';
import {HttpTrabajadorModule} from '../../trabajador/servicios/http-trabajador-module';
import {DetalleNovedadRolPagoTablaModule} from '../componentes/detalle-novedad-rol-pago-tabla-tipo/detalle-novedad-rol-pago-tabla.module';

export const DETALLE_NOVEDAD_ROL_PAGO_IMPORTS = [
  CommonModule,
  DetalleNovedadRolPagoRoutingModule,
  DetalleNovedadRolPagoPerfilModule,
  DetalleNovedadRolPagoTablaModule,
  HttpDetalleNovedadRolPagoModule,
  RouteHeaderModule,
  MatCardModule,
  HttpRubrosRolModule,
  HttpTrabajadorModule,
]
