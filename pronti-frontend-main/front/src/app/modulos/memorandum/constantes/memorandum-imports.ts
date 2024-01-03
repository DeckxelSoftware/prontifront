import {CommonModule} from '@angular/common';
import {MemorandumRoutingModule} from '../memorandum-routing.module';
import {MemorandumPerfilModule} from '../componentes/memorandum-perfil/memorandum-perfil.module';
import {MemorandumTablaModule} from '../componentes/memorandum-tabla/memorandum-tabla.module';
import {HttpMemorandumModule} from '../servicios/http-memorandum-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';

export const MEMORANDUM_IMPORTS = [
  CommonModule,
  MemorandumRoutingModule,
  MemorandumPerfilModule,
  MemorandumTablaModule,
  HttpMemorandumModule,
  RouteHeaderModule,
  MatCardModule,
]
