import {Injectable} from '@angular/core';
import {GrupoFindDto} from './dto/grupo.find-dto';
import {GrupoResponseDto} from './dto/grupo.response-dto';
import {GrupoCreateDto} from './dto/grupo.create-dto';
import {GrupoUpdateDto} from './dto/grupo.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpGrupoService
  extends AbstractHttpService<GrupoFindDto, GrupoResponseDto, GrupoCreateDto, GrupoUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/grupo',
        http: _httpClient
      }
    );
  }
}
