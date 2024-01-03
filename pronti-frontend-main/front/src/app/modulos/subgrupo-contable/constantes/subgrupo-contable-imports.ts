import {CommonModule} from '@angular/common';
import {SubgrupoContableRoutingModule} from '../subgrupo-contable-routing.module';
import {SubgrupoContablePerfilModule} from '../componentes/subgrupo-contable-perfil/subgrupo-contable-perfil.module';
import {SubgrupoContableTablaModule} from '../componentes/subgrupo-contable-tabla/subgrupo-contable-tabla.module';
import {HttpSubgrupoContableModule} from '../servicios/http-subgrupo-contable-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const SUBGRUPO_CONTABLE_IMPORTS = [
  CommonModule,
  SubgrupoContableRoutingModule,
  SubgrupoContablePerfilModule,
  SubgrupoContableTablaModule,
  HttpSubgrupoContableModule,
  RouteHeaderModule,
  MatCardModule,
]
