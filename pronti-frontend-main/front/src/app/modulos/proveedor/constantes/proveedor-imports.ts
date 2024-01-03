import {CommonModule} from '@angular/common';
import {ProveedorRoutingModule} from '../proveedor-routing.module';
import {ProveedorPerfilModule} from '../componentes/proveedor-perfil/proveedor-perfil.module';
import {ProveedorTablaModule} from '../componentes/proveedor-tabla/proveedor-tabla.module';
import {HttpProveedorModule} from '../servicios/http-proveedor-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const PROVEEDOR_IMPORTS = [
  CommonModule,
  ProveedorRoutingModule,
  ProveedorPerfilModule,
  ProveedorTablaModule,
  HttpProveedorModule,
  RouteHeaderModule,
  MatCardModule,
]
