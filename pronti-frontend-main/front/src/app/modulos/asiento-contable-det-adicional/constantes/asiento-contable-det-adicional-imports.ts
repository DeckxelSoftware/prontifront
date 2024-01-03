import {CommonModule} from '@angular/common';
import {AsientoContableDetAdicionalRoutingModule} from '../asiento-contable-det-adicional-routing.module';
import {AsientoContableDetAdicionalPerfilModule} from '../componentes/asiento-contable-det-adicional-perfil/asiento-contable-det-adicional-perfil.module';
import {AsientoContableDetAdicionalTablaModule} from '../componentes/asiento-contable-det-adicional-tabla/asiento-contable-det-adicional-tabla.module';
import {HttpAsientoContableDetAdicionalModule} from '../servicios/http-asiento-contable-det-adicional-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const ASIENTO_CONTABLE_DET_ADICIONAL_IMPORTS = [
  CommonModule,
  AsientoContableDetAdicionalRoutingModule,
  AsientoContableDetAdicionalPerfilModule,
  AsientoContableDetAdicionalTablaModule,
  HttpAsientoContableDetAdicionalModule,
  RouteHeaderModule,
  MatCardModule,
]
