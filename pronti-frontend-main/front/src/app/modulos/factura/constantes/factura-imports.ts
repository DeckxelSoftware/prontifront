import {CommonModule} from '@angular/common';
import {FacturaRoutingModule} from '../factura-routing.module';
import {FacturaPerfilModule} from '../componentes/factura-perfil/factura-perfil.module';
import {FacturaTablaModule} from '../componentes/factura-tabla/factura-tabla.module';
import {HttpFacturaModule} from '../servicios/http-factura-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {MostrarFacturaModule} from '../componentes/mostrar-factura/mostrar-factura.module';

export const FACTURA_IMPORTS = [
  CommonModule,
  FacturaRoutingModule,
  FacturaPerfilModule,
  FacturaTablaModule,
  HttpFacturaModule,
  RouteHeaderModule,
  MatCardModule,
  MostrarFacturaModule,
]
