import {CommonModule} from '@angular/common';
import {GrupoRoutingModule} from '../grupo-routing.module';
import {GrupoPerfilModule} from '../componentes/grupo-perfil/grupo-perfil.module';
import {GrupoTablaModule} from '../componentes/grupo-tabla/grupo-tabla.module';
import {HttpGrupoModule} from '../servicios/http-grupo-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const GRUPO_IMPORTS = [
  CommonModule,
  GrupoRoutingModule,
  GrupoPerfilModule,
  GrupoTablaModule,
  HttpGrupoModule,
  RouteHeaderModule,
  MatCardModule,
]
