import {CommonModule} from '@angular/common';
import {CargoRoutingModule} from '../cargo-routing.module';
import {CargoPerfilModule} from '../componentes/cargo-perfil/cargo-perfil.module';
import {CargoTablaModule} from '../componentes/cargo-tabla/cargo-tabla.module';
import {HttpCargoModule} from '../servicios/http-cargo-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpAreaModule} from '../../area/servicios/http-area-module';

export const CARGO_IMPORTS = [
  CommonModule,
  CargoRoutingModule,
  CargoPerfilModule,
  CargoTablaModule,
  HttpCargoModule,
  RouteHeaderModule,
  MatCardModule,
  HttpAreaModule,
]
