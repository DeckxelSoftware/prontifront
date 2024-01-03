import {CommonModule} from '@angular/common';
import {ChequeRoutingModule} from '../cheque-routing.module';
import {ChequePerfilModule} from '../componentes/cheque-perfil/cheque-perfil.module';
import {ChequeTablaModule} from '../componentes/cheque-tabla/cheque-tabla.module';
import {HttpChequeModule} from '../servicios/http-cheque-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpChequeraModule} from '../../chequera/servicios/http-chequera-module';

export const CHEQUE_IMPORTS = [
  CommonModule,
  ChequeRoutingModule,
  ChequePerfilModule,
  ChequeTablaModule,
  HttpChequeModule,
  RouteHeaderModule,
  MatCardModule,
  HttpChequeraModule
]
