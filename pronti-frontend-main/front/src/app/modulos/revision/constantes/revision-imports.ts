import {CommonModule} from '@angular/common';
import {RevisionRoutingModule} from '../revision-routing.module';
import {RevisionPerfilModule} from '../componentes/revision-perfil/revision-perfil.module';
import {RevisionTablaModule} from '../componentes/revision-tabla/revision-tabla.module';
import {HttpRevisionModule} from '../servicios/http-revision-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const REVISION_IMPORTS = [
  CommonModule,
  RevisionRoutingModule,
  RevisionPerfilModule,
  RevisionTablaModule,
  HttpRevisionModule,
  RouteHeaderModule,
  MatCardModule,
]
