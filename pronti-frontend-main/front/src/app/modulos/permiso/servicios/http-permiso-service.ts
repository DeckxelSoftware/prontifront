import {Injectable} from '@angular/core';
import {PermisoFindDto} from './dto/permiso.find-dto';
import {PermisoResponseDto} from './dto/permiso.response-dto';
import {PermisoCreateDto} from './dto/permiso.create-dto';
import {PermisoUpdateDto} from './dto/permiso.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpPermisoService
  extends AbstractHttpService<PermisoFindDto, PermisoResponseDto, PermisoCreateDto, PermisoUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/permiso',
        http: _httpClient
      }
    );
  }
/*  buscar(){
   return this._httpClient.get(environment.url )
  }*/
}
