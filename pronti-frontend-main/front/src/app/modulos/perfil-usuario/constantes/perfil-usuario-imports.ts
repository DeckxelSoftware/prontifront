import {CommonModule} from '@angular/common';
import {PerfilUsuarioRoutingModule} from '../perfil-usuario-routing.module';
import {PerfilUsuarioPerfilModule} from '../componentes/perfil-usuario-perfil/perfil-usuario-perfil.module';
import {PerfilUsuarioTablaModule} from '../componentes/perfil-usuario-tabla/perfil-usuario-tabla.module';
import {HttpPerfilUsuarioModule} from '../servicios/http-perfil-usuario-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpUsuarioService} from '../../usuario/servicios/http-usuario-service';

export const PERFIL_USUARIO_IMPORTS = [
  CommonModule,
  PerfilUsuarioRoutingModule,
  PerfilUsuarioPerfilModule,
  PerfilUsuarioTablaModule,
  HttpPerfilUsuarioModule,
  RouteHeaderModule,
  MatCardModule
]
