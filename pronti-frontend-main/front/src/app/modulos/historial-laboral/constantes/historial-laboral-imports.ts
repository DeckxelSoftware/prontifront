import {CommonModule} from '@angular/common';
import {HistorialLaboralRoutingModule} from '../historial-laboral-routing.module';
import {HistorialLaboralPerfilModule} from '../componentes/historial-laboral-perfil/historial-laboral-perfil.module';
import {HistorialLaboralTablaModule} from '../componentes/historial-laboral-tabla/historial-laboral-tabla.module';
import {HttpHistorialLaboralModule} from '../servicios/http-historial-laboral-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpListaValoresDetalleModule} from '../../lista-valores-detalle/servicios/http-lista-valores-detalle-module';
import {HttpAgenciaModule} from '../../agencia/servicios/http-agencia-module';
import {HttpCargoModule} from '../../cargo/servicios/http-cargo-module';

export const HISTORIAL_LABORAL_IMPORTS = [
  CommonModule,
  HistorialLaboralRoutingModule,
  HistorialLaboralPerfilModule,
  HistorialLaboralTablaModule,
  HttpHistorialLaboralModule,
  RouteHeaderModule,
  MatCardModule,
  HttpListaValoresDetalleModule,
  HttpAgenciaModule,
  HttpCargoModule,
]
