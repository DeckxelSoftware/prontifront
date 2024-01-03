import {CommonModule} from '@angular/common';
import {ChequeraRoutingModule} from '../chequera-routing.module';
import {ChequeraPerfilModule} from '../componentes/chequera-perfil/chequera-perfil.module';
import {ChequeraTablaModule} from '../componentes/chequera-tabla/chequera-tabla.module';
import {HttpChequeraModule} from '../servicios/http-chequera-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpCuentaBancariaEmpresaModule} from '../../cuenta-bancaria-empresa/servicios/http-cuenta-bancaria-empresa-module';

export const CHEQUERA_IMPORTS = [
  CommonModule,
  ChequeraRoutingModule,
  ChequeraPerfilModule,
  ChequeraTablaModule,
  HttpChequeraModule,
  RouteHeaderModule,
  MatCardModule,
  HttpCuentaBancariaEmpresaModule,
]
