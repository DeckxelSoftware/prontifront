import {Injectable} from '@angular/core';
import {OrdenDeCompraFindDto} from './dto/orden-de-compra.find-dto';
import {OrdenDeCompraResponseDto} from './dto/orden-de-compra.response-dto';
import {OrdenDeCompraCreateDto} from './dto/orden-de-compra.create-dto';
import {OrdenDeCompraUpdateDto} from './dto/orden-de-compra.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpOrdenDeCompraService
  extends AbstractHttpService<OrdenDeCompraFindDto, OrdenDeCompraResponseDto, OrdenDeCompraCreateDto, OrdenDeCompraUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/orden-de-compra',
        http: _httpClient
      }
    );
  }
}
