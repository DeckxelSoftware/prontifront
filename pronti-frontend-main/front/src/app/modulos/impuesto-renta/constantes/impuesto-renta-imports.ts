import {CommonModule} from '@angular/common';
import {ImpuestoRentaRoutingModule} from '../impuesto-renta-routing.module';
import {ImpuestoRentaPerfilModule} from '../componentes/impuesto-renta-perfil/impuesto-renta-perfil.module';
import {ImpuestoRentaTablaModule} from '../componentes/impuesto-renta-tabla/impuesto-renta-tabla.module';
import {HttpImpuestoRentaModule} from '../servicios/http-impuesto-renta-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const IMPUESTO_RENTA_IMPORTS = [
  CommonModule,
  ImpuestoRentaRoutingModule,
  ImpuestoRentaPerfilModule,
  ImpuestoRentaTablaModule,
  HttpImpuestoRentaModule,
  RouteHeaderModule,
  MatCardModule,
]
