import {Injectable} from '@angular/core';
import {ImpuestoRentaFindDto} from './dto/impuesto-renta.find-dto';
import {ImpuestoRentaResponseDto} from './dto/impuesto-renta.response-dto';
import {ImpuestoRentaCreateDto} from './dto/impuesto-renta.create-dto';
import {ImpuestoRentaUpdateDto} from './dto/impuesto-renta.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpImpuestoRentaService
  extends AbstractHttpService<ImpuestoRentaFindDto, ImpuestoRentaResponseDto, ImpuestoRentaCreateDto, ImpuestoRentaUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/impuestoRenta',
        http: _httpClient
      }
    );
  }
}
