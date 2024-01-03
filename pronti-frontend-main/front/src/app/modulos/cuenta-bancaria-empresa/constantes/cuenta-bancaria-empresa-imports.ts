import {CommonModule} from '@angular/common';
import {CuentaBancariaEmpresaRoutingModule} from '../cuenta-bancaria-empresa-routing.module';
import {CuentaBancariaEmpresaPerfilModule} from '../componentes/cuenta-bancaria-empresa-perfil/cuenta-bancaria-empresa-perfil.module';
import {CuentaBancariaEmpresaTablaModule} from '../componentes/cuenta-bancaria-empresa-tabla/cuenta-bancaria-empresa-tabla.module';
import {HttpCuentaBancariaEmpresaModule} from '../servicios/http-cuenta-bancaria-empresa-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const CUENTA_BANCARIA_EMPRESA_IMPORTS = [
  CommonModule,
  CuentaBancariaEmpresaRoutingModule,
  CuentaBancariaEmpresaPerfilModule,
  CuentaBancariaEmpresaTablaModule,
  HttpCuentaBancariaEmpresaModule,
  RouteHeaderModule,
  MatCardModule,
]
