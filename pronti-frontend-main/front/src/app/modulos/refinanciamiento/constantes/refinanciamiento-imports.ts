import {CommonModule} from '@angular/common';
import {RefinanciamientoRoutingModule} from '../refinanciamiento-routing.module';
import {RefinanciamientoPerfilModule} from '../componentes/refinanciamiento-perfil/refinanciamiento-perfil.module';
import {RefinanciamientoTablaModule} from '../componentes/refinanciamiento-tabla/refinanciamiento-tabla.module';
import {HttpRefinanciamientoModule} from '../servicios/http-refinanciamiento-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const REFINANCIAMIENTO_IMPORTS = [
  CommonModule,
  RefinanciamientoRoutingModule,
  RefinanciamientoPerfilModule,
  RefinanciamientoTablaModule,
  HttpRefinanciamientoModule,
  RouteHeaderModule,
  MatCardModule,
]
