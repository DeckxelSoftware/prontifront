import {Injectable} from '@angular/core';
import {AsientoContableCabeceraFindDto} from './dto/asiento-contable-cabecera.find-dto';
import {AsientoContableCabeceraResponseDto} from './dto/asiento-contable-cabecera.response-dto';
import {AsientoContableCabeceraCreateDto} from './dto/asiento-contable-cabecera.create-dto';
import {AsientoContableCabeceraUpdateDto} from './dto/asiento-contable-cabecera.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpAsientoContableCabeceraService
  extends AbstractHttpService<AsientoContableCabeceraFindDto, AsientoContableCabeceraResponseDto, AsientoContableCabeceraCreateDto, AsientoContableCabeceraUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/asiento-contable-cabecera',
        http: _httpClient
      }
    );
  }
}
