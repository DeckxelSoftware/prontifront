import {CommonModule} from '@angular/common';
import {ClienteRoutingModule} from '../cliente-routing.module';
import {ClientePerfilModule} from '../componentes/cliente-perfil/cliente-perfil.module';
import {ClienteTablaModule} from '../componentes/cliente-tabla/cliente-tabla.module';
import {HttpClienteModule} from '../servicios/http-cliente-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const CLIENTE_IMPORTS = [
  CommonModule,
  ClienteRoutingModule,
  ClientePerfilModule,
  ClienteTablaModule,
  HttpClienteModule,
  RouteHeaderModule,
  MatCardModule,
]
