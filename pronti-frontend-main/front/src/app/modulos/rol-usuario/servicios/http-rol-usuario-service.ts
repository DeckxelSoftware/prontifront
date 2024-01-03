import {Injectable} from '@angular/core';
import {RolUsuarioFindDto} from './dto/rol-usuario.find-dto';
import {RolUsuarioResponseDto} from './dto/rol-usuario.response-dto';
import {RolUsuarioCreateDto} from './dto/rol-usuario.create-dto';
import {RolUsuarioUpdateDto} from './dto/rol-usuario.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpRolUsuarioService
  extends AbstractHttpService<RolUsuarioFindDto, RolUsuarioResponseDto, RolUsuarioCreateDto, RolUsuarioUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/rol-usuario',
        http: _httpClient
      }
    );
  }
}
