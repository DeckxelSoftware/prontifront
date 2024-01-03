import {CommonModule} from '@angular/common';
import {ListaValoresDetalleRoutingModule} from '../lista-valores-detalle-routing.module';
import {ListaValoresDetallePerfilModule} from '../componentes/lista-valores-detalle-perfil/lista-valores-detalle-perfil.module';
import {ListaValoresDetalleTablaModule} from '../componentes/lista-valores-detalle-tabla/lista-valores-detalle-tabla.module';
import {HttpListaValoresDetalleModule} from '../servicios/http-lista-valores-detalle-module';
import {MatCardModule} from '@angular/material/card';
import {RouteHeaderModule} from '../../../componentes/routes/route-header/route-header.module';
import {HttpListaValoresTipoModule} from '../../../servicios/lista-valores-tipo/http-lista-valores-tipo.module';

export const LISTA_VALORES_DETALLE_IMPORTS = [
  CommonModule,
  ListaValoresDetalleRoutingModule,
  ListaValoresDetallePerfilModule,
  ListaValoresDetalleTablaModule,
  HttpListaValoresDetalleModule,
  RouteHeaderModule,
  MatCardModule,
  HttpListaValoresTipoModule,
]
