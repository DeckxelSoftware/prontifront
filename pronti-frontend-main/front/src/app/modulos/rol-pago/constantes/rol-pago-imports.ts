import {CommonModule} from '@angular/common';
import {RolPagoRoutingModule} from '../rol-pago-routing.module';
import {RolPagoPerfilModule} from '../componentes/rol-pago-perfil/rol-pago-perfil.module';
import {RolPagoTablaModule} from '../componentes/rol-pago-tabla/rol-pago-tabla.module';
import {HttpRolPagoModule} from '../servicios/http-rol-pago-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from "../../../componentes/routes/route-header/route-header.module";

export const ROL_PAGO_IMPORTS = [
  CommonModule,
  RolPagoRoutingModule,
  RolPagoPerfilModule,
  RolPagoTablaModule,
  HttpRolPagoModule,
  RouteHeaderModule,
  MatCardModule,
]
