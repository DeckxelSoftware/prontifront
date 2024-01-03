import {Injectable} from '@angular/core';
import {GrupoContableFindDto} from './dto/grupo-contable.find-dto';
import {GrupoContableResponseDto} from './dto/grupo-contable.response-dto';
import {GrupoContableCreateDto} from './dto/grupo-contable.create-dto';
import {GrupoContableUpdateDto} from './dto/grupo-contable.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpGrupoContableService
  extends AbstractHttpService<GrupoContableFindDto, GrupoContableResponseDto, GrupoContableCreateDto, GrupoContableUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/grupo-contable',
        http: _httpClient
      }
    );
  }
}
