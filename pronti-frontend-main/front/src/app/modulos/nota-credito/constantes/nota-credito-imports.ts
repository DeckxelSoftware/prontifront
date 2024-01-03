import {CommonModule} from '@angular/common';
import {NotaCreditoRoutingModule} from '../nota-credito-routing.module';
import {NotaCreditoPerfilModule} from '../componentes/nota-credito-perfil/nota-credito-perfil.module';
import {NotaCreditoTablaModule} from '../componentes/nota-credito-tabla/nota-credito-tabla.module';
import {HttpNotaCreditoModule} from '../servicios/http-nota-credito-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const NOTA_CREDITO_IMPORTS = [
  CommonModule,
  NotaCreditoRoutingModule,
  NotaCreditoPerfilModule,
  NotaCreditoTablaModule,
  HttpNotaCreditoModule,
  RouteHeaderModule,
  MatCardModule,
]
