import {CommonModule} from '@angular/common';
import {AsientoContableCabeceraRoutingModule} from '../asiento-contable-cabecera-routing.module';
import {AsientoContableCabeceraPerfilModule} from '../componentes/asiento-contable-cabecera-perfil/asiento-contable-cabecera-perfil.module';
import {AsientoContableCabeceraTablaModule} from '../componentes/asiento-contable-cabecera-tabla/asiento-contable-cabecera-tabla.module';
import {HttpAsientoContableCabeceraModule} from '../servicios/http-asiento-contable-cabecera-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const ASIENTO_CONTABLE_CABECERA_IMPORTS = [
  CommonModule,
  AsientoContableCabeceraRoutingModule,
  AsientoContableCabeceraPerfilModule,
  AsientoContableCabeceraTablaModule,
  HttpAsientoContableCabeceraModule,
  RouteHeaderModule,
  MatCardModule,
]
