import {CommonModule} from '@angular/common';
import {ArchivoRoutingModule} from '../archivo-routing.module';
import {ArchivoPerfilModule} from '../componentes/archivo-perfil/archivo-perfil.module';
import {ArchivoTablaModule} from '../componentes/archivo-tabla/archivo-tabla.module';
import {HttpArchivoModule} from '../servicios/http-archivo-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const ARCHIVO_IMPORTS = [
  CommonModule,
  ArchivoRoutingModule,
  ArchivoPerfilModule,
  ArchivoTablaModule,
  HttpArchivoModule,
  RouteHeaderModule,
  MatCardModule,
]
