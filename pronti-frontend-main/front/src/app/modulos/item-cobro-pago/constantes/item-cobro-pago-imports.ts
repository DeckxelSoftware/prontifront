import {CommonModule} from '@angular/common';
import {ItemCobroPagoRoutingModule} from '../item-cobro-pago-routing.module';
import {ItemCobroPagoPerfilModule} from '../componentes/item-cobro-pago-perfil/item-cobro-pago-perfil.module';
import {ItemCobroPagoTablaModule} from '../componentes/item-cobro-pago-tabla/item-cobro-pago-tabla.module';
import {HttpItemCobroPagoModule} from '../servicios/http-item-cobro-pago-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const ITEM_COBRO_PAGO_IMPORTS = [
  CommonModule,
  ItemCobroPagoRoutingModule,
  ItemCobroPagoPerfilModule,
  ItemCobroPagoTablaModule,
  HttpItemCobroPagoModule,
  RouteHeaderModule,
  MatCardModule,
]
