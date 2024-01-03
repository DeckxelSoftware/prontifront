import {Injectable} from '@angular/core';
import {AbonoPrestamoFindDto} from './dto/abono-prestamo.find-dto';
import {AbonoPrestamoResponseDto} from './dto/abono-prestamo.response-dto';
import {AbonoPrestamoCreateDto} from './dto/abono-prestamo.create-dto';
import {AbonoPrestamoUpdateDto} from './dto/abono-prestamo.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpAbonoPrestamoService
  extends AbstractHttpService<AbonoPrestamoFindDto, AbonoPrestamoResponseDto, AbonoPrestamoCreateDto, AbonoPrestamoUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/abono-prestamo',
        http: _httpClient
      }
    );
  }
}
