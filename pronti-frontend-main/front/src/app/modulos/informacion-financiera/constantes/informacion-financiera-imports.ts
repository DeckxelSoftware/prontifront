import {CommonModule} from '@angular/common';
import {InformacionFinancieraRoutingModule} from '../informacion-financiera-routing.module';
import {InformacionFinancieraPerfilModule} from '../componentes/informacion-financiera-perfil/informacion-financiera-perfil.module';
import {InformacionFinancieraTablaModule} from '../componentes/informacion-financiera-tabla/informacion-financiera-tabla.module';
import {HttpInformacionFinancieraModule} from '../servicios/http-informacion-financiera-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const INFORMACION_FINANCIERA_IMPORTS = [
  CommonModule,
  InformacionFinancieraRoutingModule,
  InformacionFinancieraPerfilModule,
  InformacionFinancieraTablaModule,
  HttpInformacionFinancieraModule,
  RouteHeaderModule,
  MatCardModule,
]
