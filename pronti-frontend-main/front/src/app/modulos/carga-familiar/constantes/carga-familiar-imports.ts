import {CommonModule} from '@angular/common';
import {CargaFamiliarRoutingModule} from '../carga-familiar-routing.module';
import {CargaFamiliarPerfilModule} from '../componentes/carga-familiar-perfil/carga-familiar-perfil.module';
import {CargaFamiliarTablaModule} from '../componentes/carga-familiar-tabla/carga-familiar-tabla.module';
import {HttpCargaFamiliarModule} from '../servicios/http-carga-familiar-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const CARGA_FAMILIAR_IMPORTS = [
  CommonModule,
  CargaFamiliarRoutingModule,
  CargaFamiliarPerfilModule,
  CargaFamiliarTablaModule,
  HttpCargaFamiliarModule,
  RouteHeaderModule,
  MatCardModule,
]
