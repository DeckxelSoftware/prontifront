import {CommonModule} from '@angular/common';
import {CuentaContableRoutingModule} from '../cuenta-contable-routing.module';
import {CuentaContablePerfilModule} from '../componentes/cuenta-contable-perfil/cuenta-contable-perfil.module';
import {CuentaContableTablaModule} from '../componentes/cuenta-contable-tabla/cuenta-contable-tabla.module';
import {HttpCuentaContableModule} from '../servicios/http-cuenta-contable-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpPeriodoContableModule} from '../../periodo-contable/servicios/http-periodo-contable-module';

export const CUENTA_CONTABLE_IMPORTS = [
  CommonModule,
  CuentaContableRoutingModule,
  CuentaContablePerfilModule,
  CuentaContableTablaModule,
  HttpCuentaContableModule,
  RouteHeaderModule,
  MatCardModule,
  HttpPeriodoContableModule,
]
