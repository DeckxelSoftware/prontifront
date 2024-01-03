import {CommonModule} from '@angular/common';
import {BancoRoutingModule} from '../banco-routing.module';
import {BancoPerfilModule} from '../componentes/banco-perfil/banco-perfil.module';
import {BancoTablaModule} from '../componentes/banco-tabla/banco-tabla.module';
import {HttpBancoModule} from '../servicios/http-banco-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const BANCO_IMPORTS = [
  CommonModule,
  BancoRoutingModule,
  BancoPerfilModule,
  BancoTablaModule,
  HttpBancoModule,
  RouteHeaderModule,
  MatCardModule,
]
