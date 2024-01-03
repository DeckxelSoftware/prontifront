import {Injectable} from '@angular/core';
import {ListaValoresDetalleFindDto} from './dto/lista-valores-detalle.find-dto';
import {ListaValoresDetalleResponseDto} from './dto/lista-valores-detalle.response-dto';
import {ListaValoresDetalleCreateDto} from './dto/lista-valores-detalle.create-dto';
import {ListaValoresDetalleUpdateDto} from './dto/lista-valores-detalle.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpListaValoresDetalleService
  extends AbstractHttpService<ListaValoresDetalleFindDto, ListaValoresDetalleResponseDto, ListaValoresDetalleCreateDto, ListaValoresDetalleUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/lista-valores-detalle',
        http: _httpClient
      }
    );
  }
}
