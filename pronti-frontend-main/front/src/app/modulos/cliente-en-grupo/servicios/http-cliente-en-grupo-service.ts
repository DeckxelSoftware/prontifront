import {Injectable} from '@angular/core';
import {ClienteEnGrupoFindDto} from './dto/cliente-en-grupo.find-dto';
import {ClienteEnGrupoResponseDto} from './dto/cliente-en-grupo.response-dto';
import {ClienteEnGrupoCreateDto} from './dto/cliente-en-grupo.create-dto';
import {ClienteEnGrupoUpdateDto} from './dto/cliente-en-grupo.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpClienteEnGrupoService
  extends AbstractHttpService<ClienteEnGrupoFindDto, ClienteEnGrupoResponseDto, ClienteEnGrupoCreateDto, ClienteEnGrupoUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/cliente-en-grupo',
        http: _httpClient
      }
    );
  }
}
