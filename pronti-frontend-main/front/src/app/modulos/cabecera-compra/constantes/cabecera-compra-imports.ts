import {CommonModule} from '@angular/common';
import {CabeceraCompraRoutingModule} from '../cabecera-compra-routing.module';
import {CabeceraCompraPerfilModule} from '../componentes/cabecera-compra-perfil/cabecera-compra-perfil.module';
import {CabeceraCompraTablaModule} from '../componentes/cabecera-compra-tabla/cabecera-compra-tabla.module';
import {HttpCabeceraCompraModule} from '../servicios/http-cabecera-compra-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from "../../../componentes/routes/route-header/route-header.module";

export const CABECERA_COMPRA_IMPORTS = [
  CommonModule,
  CabeceraCompraRoutingModule,
  CabeceraCompraPerfilModule,
  CabeceraCompraTablaModule,
  HttpCabeceraCompraModule,
  RouteHeaderModule,
  MatCardModule,
]
