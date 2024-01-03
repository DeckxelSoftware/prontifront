import {Injectable} from '@angular/core';
import {HttpListaValoresTipoModule} from './http-lista-valores-tipo.module';
import {AbstractHttpService} from '../../abstract/http/abstract-http.service';
import {ListaValoresDetalleResponseDto} from '../../modulos/lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {ListaValoresTipoFindDto} from './dto/lista-valores-tipo.find-dto';
import {ListaValoresTipoResponseDto} from './dto/lista-valores-tipo.response-dto';

@Injectable(
  {
    providedIn: HttpListaValoresTipoModule
  }
)
export class HttpListaValoresTipoService extends AbstractHttpService<ListaValoresTipoFindDto, ListaValoresTipoResponseDto, any, any> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/lista-valores-tipo',
        http: _httpClient
      }
    );
  }
}
