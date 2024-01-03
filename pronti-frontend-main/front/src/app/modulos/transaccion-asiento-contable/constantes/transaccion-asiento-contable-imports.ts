import {CommonModule} from '@angular/common';
import {TransaccionAsientoContableRoutingModule} from '../transaccion-asiento-contable-routing.module';
import {TransaccionAsientoContablePerfilModule} from '../componentes/transaccion-asiento-contable-perfil/transaccion-asiento-contable-perfil.module';
import {TransaccionAsientoContableTablaModule} from '../componentes/transaccion-asiento-contable-tabla/transaccion-asiento-contable-tabla.module';
import {HttpTransaccionAsientoContableModule} from '../servicios/http-transaccion-asiento-contable-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from "../../../componentes/routes/route-header/route-header.module";

export const TRANSACCION_ASIENTO_CONTABLE_IMPORTS = [
  CommonModule,
  TransaccionAsientoContableRoutingModule,
  TransaccionAsientoContablePerfilModule,
  TransaccionAsientoContableTablaModule,
  HttpTransaccionAsientoContableModule,
  RouteHeaderModule,
  MatCardModule,
]
