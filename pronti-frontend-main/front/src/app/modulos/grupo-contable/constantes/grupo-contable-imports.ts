import {CommonModule} from '@angular/common';
import {GrupoContableRoutingModule} from '../grupo-contable-routing.module';
import {GrupoContablePerfilModule} from '../componentes/grupo-contable-perfil/grupo-contable-perfil.module';
import {GrupoContableTablaModule} from '../componentes/grupo-contable-tabla/grupo-contable-tabla.module';
import {HttpGrupoContableModule} from '../servicios/http-grupo-contable-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const GRUPO_CONTABLE_IMPORTS = [
  CommonModule,
  GrupoContableRoutingModule,
  GrupoContablePerfilModule,
  GrupoContableTablaModule,
  HttpGrupoContableModule,
  RouteHeaderModule,
  MatCardModule,
]
