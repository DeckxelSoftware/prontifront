import {CommonModule} from '@angular/common';
import {VendedorRoutingModule} from '../vendedor-routing.module';
import {VendedorPerfilModule} from '../componentes/vendedor-perfil/vendedor-perfil.module';
import {VendedorTablaModule} from '../componentes/vendedor-tabla/vendedor-tabla.module';
import {HttpVendedorModule} from '../servicios/http-vendedor-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpTrabajadorModule} from '../../trabajador/servicios/http-trabajador-module';
import {HttpAgenciaModule} from '../../agencia/servicios/http-agencia-module';
import { HttpProveedorModule } from '../../proveedor/servicios/http-proveedor-module';
import { HttpEmpresaModule } from '../../empresa/servicios/http-empresa-module';

export const VENDEDOR_IMPORTS = [
  CommonModule,
  VendedorRoutingModule,
  VendedorPerfilModule,
  VendedorTablaModule,
  HttpVendedorModule,
  RouteHeaderModule,
  MatCardModule,
  HttpTrabajadorModule,
  HttpAgenciaModule,
  HttpProveedorModule,
  HttpEmpresaModule,

]
