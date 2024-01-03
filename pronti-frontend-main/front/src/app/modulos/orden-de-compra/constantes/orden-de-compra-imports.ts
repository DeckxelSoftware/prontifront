import {CommonModule} from '@angular/common';
import {OrdenDeCompraRoutingModule} from '../orden-de-compra-routing.module';
import {OrdenDeCompraPerfilModule} from '../componentes/orden-de-compra-perfil/orden-de-compra-perfil.module';
import {OrdenDeCompraTablaModule} from '../componentes/orden-de-compra-tabla/orden-de-compra-tabla.module';
import {HttpOrdenDeCompraModule} from '../servicios/http-orden-de-compra-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const ORDEN_DE_COMPRA_IMPORTS = [
  CommonModule,
  OrdenDeCompraRoutingModule,
  OrdenDeCompraPerfilModule,
  OrdenDeCompraTablaModule,
  HttpOrdenDeCompraModule,
  RouteHeaderModule,
  MatCardModule,
]
