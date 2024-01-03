import {CommonModule} from '@angular/common';
import {ConfiguracionGeneralRoutingModule} from '../configuracion-general-routing.module';
import {ConfiguracionGeneralPerfilModule} from '../componentes/configuracion-general-perfil/configuracion-general-perfil.module';
import {ConfiguracionGeneralTablaModule} from '../componentes/configuracion-general-tabla/configuracion-general-tabla.module';
import {HttpConfiguracionGeneralModule} from '../servicios/http-configuracion-general-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const CONFIGURACION_GENERAL_IMPORTS = [
  CommonModule,
  ConfiguracionGeneralRoutingModule,
  ConfiguracionGeneralPerfilModule,
  ConfiguracionGeneralTablaModule,
  HttpConfiguracionGeneralModule,
  RouteHeaderModule,
  MatCardModule,
]
