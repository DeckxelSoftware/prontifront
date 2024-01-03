import {CommonModule} from '@angular/common';
import {DivisionAdministrativaRoutingModule} from '../division-administrativa-routing.module';
import {DivisionAdministrativaPerfilModule} from '../componentes/division-administrativa-perfil/division-administrativa-perfil.module';
import {DivisionAdministrativaTablaModule} from '../componentes/division-administrativa-tabla/division-administrativa-tabla.module';
import {HttpDivisionAdministrativaModule} from '../servicios/http-division-administrativa-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const DIVISION_ADMINISTRATIVA_IMPORTS = [
  CommonModule,
  DivisionAdministrativaRoutingModule,
  DivisionAdministrativaPerfilModule,
  DivisionAdministrativaTablaModule,
  HttpDivisionAdministrativaModule,
  RouteHeaderModule,
  MatCardModule,
]
