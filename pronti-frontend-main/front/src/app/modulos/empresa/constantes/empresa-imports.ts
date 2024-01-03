import {CommonModule} from '@angular/common';
import {EmpresaRoutingModule} from '../empresa-routing.module';
import {EmpresaPerfilModule} from '../componentes/empresa-perfil/empresa-perfil.module';
import {EmpresaTablaModule} from '../componentes/empresa-tabla/empresa-tabla.module';
import {HttpEmpresaModule} from '../servicios/http-empresa-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const EMPRESA_IMPORTS = [
  CommonModule,
  EmpresaRoutingModule,
  EmpresaPerfilModule,
  EmpresaTablaModule,
  HttpEmpresaModule,
  RouteHeaderModule,
  MatCardModule,
]
