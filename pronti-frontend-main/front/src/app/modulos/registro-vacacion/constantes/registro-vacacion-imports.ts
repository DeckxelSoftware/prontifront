import {CommonModule} from '@angular/common';
import {RegistroVacacionRoutingModule} from '../registro-vacacion-routing.module';
import {RegistroVacacionPerfilModule} from '../componentes/registro-vacacion-perfil/registro-vacacion-perfil.module';
import {RegistroVacacionTablaModule} from '../componentes/registro-vacacion-tabla/registro-vacacion-tabla.module';
import {HttpRegistroVacacionModule} from '../servicios/http-registro-vacacion-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from "../../../componentes/routes/route-header/route-header.module";

export const REGISTRO_VACACION_IMPORTS = [
  CommonModule,
  RegistroVacacionRoutingModule,
  RegistroVacacionPerfilModule,
  RegistroVacacionTablaModule,
  HttpRegistroVacacionModule,
  RouteHeaderModule,
  MatCardModule,
]
