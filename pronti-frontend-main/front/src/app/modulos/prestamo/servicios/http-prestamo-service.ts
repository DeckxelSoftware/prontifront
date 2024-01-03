import {Injectable} from '@angular/core';
import {PrestamoFindDto} from './dto/prestamo.find-dto';
import {PrestamoResponseDto} from './dto/prestamo.response-dto';
import {PrestamoCreateDto} from './dto/prestamo.create-dto';
import {PrestamoUpdateDto} from './dto/prestamo.update-dto';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpPrestamoService
  extends AbstractHttpService<PrestamoFindDto, PrestamoResponseDto, PrestamoCreateDto, PrestamoUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/prestamo',
        http: _httpClient
      }
    );
  }

  generarPrestamo(prestamo: PrestamoCreateDto) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      })
    }
    return this._httpClient.post(this.URL + this.parameters.URLSection + '/cuotas', prestamo, httpOptions)
  }
}
