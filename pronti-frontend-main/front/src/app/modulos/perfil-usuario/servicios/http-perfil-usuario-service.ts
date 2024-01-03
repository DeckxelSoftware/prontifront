import {Injectable} from '@angular/core';
import {PerfilUsuarioFindDto} from './dto/perfil-usuario.find-dto';
import {PerfilUsuarioResponseDto} from './dto/perfil-usuario.response-dto';
import {PerfilUsuarioCreateDto} from './dto/perfil-usuario.create-dto';
import {PerfilUsuarioUpdateDto} from './dto/perfil-usuario.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpUsuarioService
  extends AbstractHttpService<PerfilUsuarioFindDto, PerfilUsuarioResponseDto, PerfilUsuarioCreateDto, PerfilUsuarioUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/perfil-usuario',
        http: _httpClient
      }
    );
  }
}
