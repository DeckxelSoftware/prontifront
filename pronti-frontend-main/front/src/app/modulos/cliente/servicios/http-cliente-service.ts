import {Injectable} from '@angular/core';
import {ClienteFindDto} from './dto/cliente.find-dto';
import {ClienteResponseDto} from './dto/cliente.response-dto';
import {ClienteCreateDto} from './dto/cliente.create-dto';
import {ClienteUpdateDto} from './dto/cliente.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpClienteService
  extends AbstractHttpService<ClienteFindDto, ClienteResponseDto, ClienteCreateDto, ClienteUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/cliente',
        http: _httpClient
      }
    );
  }
}
