import {Injectable} from '@angular/core';
import {TrabajadorFindDto} from './dto/trabajador.find-dto';
import {TrabajadorResponseDto} from './dto/trabajador.response-dto';
import {TrabajadorCreateDto} from './dto/trabajador.create-dto';
import {TrabajadorUpdateDto} from './dto/trabajador.update-dto';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpTrabajadorService
  extends AbstractHttpService<TrabajadorFindDto, TrabajadorResponseDto, TrabajadorCreateDto, TrabajadorUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/trabajador',
        http: _httpClient
      }
    );
  }

  findCustome(busqueda: TrabajadorFindDto) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //       Authorization: `Bearer ${localStorage.getItem('jwt')}`
    //     }
    //   )
    // }
    return this._httpClient.get(`${this.URL}${this.parameters.URLSection}/custom`,
      {
        params: {...busqueda},
        headers: {Authorization: `Bearer ${localStorage.getItem('jwt')}`}
      }
    )
  }
}
