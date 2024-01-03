import {Injectable} from '@angular/core';
import {RolPermisoFindDto} from './dto/rol-permiso.find-dto';
import {RolPermisoResponseDto} from './dto/rol-permiso.response-dto';
import {RolPermisoCreateDto} from './dto/rol-permiso.create-dto';
import {RolPermisoUpdateDto} from './dto/rol-permiso.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpRolPermisoService
  extends AbstractHttpService<RolPermisoFindDto, RolPermisoResponseDto, RolPermisoCreateDto, RolPermisoUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/rol-permiso',
        http: _httpClient
      }
    );
  }
}
