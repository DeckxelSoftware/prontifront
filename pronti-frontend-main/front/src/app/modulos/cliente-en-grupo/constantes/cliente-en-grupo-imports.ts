import {CommonModule} from '@angular/common';
import {ClienteEnGrupoRoutingModule} from '../cliente-en-grupo-routing.module';
import {ClienteEnGrupoPerfilModule} from '../componentes/cliente-en-grupo-perfil/cliente-en-grupo-perfil.module';
import {ClienteEnGrupoTablaModule} from '../componentes/cliente-en-grupo-tabla/cliente-en-grupo-tabla.module';
import {HttpClienteEnGrupoModule} from '../servicios/http-cliente-en-grupo-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const CLIENTE_EN_GRUPO_IMPORTS = [
  CommonModule,
  ClienteEnGrupoRoutingModule,
  ClienteEnGrupoPerfilModule,
  ClienteEnGrupoTablaModule,
  HttpClienteEnGrupoModule,
  RouteHeaderModule,
  MatCardModule,
]
