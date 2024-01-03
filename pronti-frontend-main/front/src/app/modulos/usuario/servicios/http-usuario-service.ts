import {Injectable} from '@angular/core';
import {UsuarioFindDto} from './dto/usuario.find-dto';
import {UsuarioResponseDto} from './dto/usuario.response-dto';
import {UsuarioCreateDto} from './dto/usuario.create-dto';
import {UsuarioUpdateDto} from './dto/usuario.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpUsuarioService
  extends AbstractHttpService<UsuarioFindDto, UsuarioResponseDto, UsuarioCreateDto, UsuarioUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/usuario',
        http: _httpClient
      }
    );
  }

  updatePassword(idUser: number, oldPass: string, newPass: string) {
    return this._httpClient.put(`${this.URL}/usuario/password/${idUser}`, {
        passwordActual: oldPass,
        passwordNuevo: newPass
      },
      this.httpOptions
    )
  }
}
