import {CommonModule} from '@angular/common';
import {ContratoRoutingModule} from '../contrato-routing.module';
import {ContratoPerfilModule} from '../componentes/contrato-perfil/contrato-perfil.module';
import {ContratoTablaModule} from '../componentes/contrato-tabla/contrato-tabla.module';
import {HttpContratoModule} from '../servicios/http-contrato-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const CONTRATO_IMPORTS = [
  CommonModule,
  ContratoRoutingModule,
  ContratoPerfilModule,
  ContratoTablaModule,
  HttpContratoModule,
  RouteHeaderModule,
  MatCardModule,
]
