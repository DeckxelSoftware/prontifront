import {CommonModule} from '@angular/common';
import {CargoVacacionRoutingModule} from '../cargo-vacacion-routing.module';
import {CargoVacacionPerfilModule} from '../componentes/cargo-vacacion-perfil/cargo-vacacion-perfil.module';
import {CargoVacacionTablaModule} from '../componentes/cargo-vacacion-tabla/cargo-vacacion-tabla.module';
import {HttpCargoVacacionModule} from '../servicios/http-cargo-vacacion-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import { ReporteVacacionTablaModule } from '../componentes/reporte-vacacion-tabla/reporte-vacacion-tabla.module';

export const CARGO_VACACION_IMPORTS = [
  CommonModule,
  CargoVacacionRoutingModule,
  CargoVacacionPerfilModule,
  CargoVacacionTablaModule,
  HttpCargoVacacionModule,
  RouteHeaderModule,
  MatCardModule,
  ReporteVacacionTablaModule,
]
