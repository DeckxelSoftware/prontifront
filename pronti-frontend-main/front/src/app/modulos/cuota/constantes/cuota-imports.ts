import {CommonModule} from '@angular/common';
import {CuotaRoutingModule} from '../cuota-routing.module';
import {CuotaPerfilModule} from '../componentes/cuota-perfil/cuota-perfil.module';
import {CuotaTablaModule} from '../componentes/cuota-tabla/cuota-tabla.module';
import {HttpCuotaModule} from '../servicios/http-cuota-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {EstadoContratoModule} from '../../../servicios/estado-contrato/estado-contrato.module';
import {HttpConfiguracionGeneralModule} from '../../configuracion-general/servicios/http-configuracion-general-module';

export const CUOTA_IMPORTS = [
  CommonModule,
  CuotaRoutingModule,
  CuotaPerfilModule,
  CuotaTablaModule,
  HttpCuotaModule,
  RouteHeaderModule,
  MatCardModule,
  EstadoContratoModule,
  HttpConfiguracionGeneralModule,
]
