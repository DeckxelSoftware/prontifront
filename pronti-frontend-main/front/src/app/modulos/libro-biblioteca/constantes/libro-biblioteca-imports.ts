import {CommonModule} from '@angular/common';
import {LibroBibliotecaRoutingModule} from '../libro-biblioteca-routing.module';
import {LibroBibliotecaPerfilModule} from '../componentes/libro-biblioteca-perfil/libro-biblioteca-perfil.module';
import {LibroBibliotecaTablaModule} from '../componentes/libro-biblioteca-tabla/libro-biblioteca-tabla.module';
import {HttpLibroBibliotecaModule} from '../servicios/http-libro-biblioteca-module';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {MatCardModule} from '@angular/material/card';

export const LIBRO_BIBLIOTECA_IMPORTS = [
  CommonModule,
  LibroBibliotecaRoutingModule,
  LibroBibliotecaPerfilModule,
  LibroBibliotecaTablaModule,
  HttpLibroBibliotecaModule,
  RouteHeaderModule,
  MatCardModule,
]
