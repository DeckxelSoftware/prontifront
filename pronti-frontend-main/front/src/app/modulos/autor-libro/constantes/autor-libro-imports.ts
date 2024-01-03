import {CommonModule} from '@angular/common';
import {AutorLibroRoutingModule} from '../autor-libro-routing.module';
import {AutorLibroPerfilModule} from '../componentes/autor-libro-perfil/autor-libro-perfil.module';
import {AutorLibroTablaModule} from '../componentes/autor-libro-tabla/autor-libro-tabla.module';
import {HttpAutorLibroModule} from '../servicios/http-autor-libro-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const AUTOR_LIBRO_IMPORTS = [
  CommonModule,
  AutorLibroRoutingModule,
  AutorLibroPerfilModule,
  AutorLibroTablaModule,
  HttpAutorLibroModule,
  RouteHeaderModule,
  MatCardModule,
]
