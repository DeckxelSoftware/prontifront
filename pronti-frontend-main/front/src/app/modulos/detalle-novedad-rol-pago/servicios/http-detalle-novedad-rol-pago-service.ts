import {Injectable} from '@angular/core';
import {DetalleNovedadRolPagoFindDto} from './dto/detalle-novedad-rol-pago.find-dto';
import {DetalleNovedadRolPagoResponseDto} from './dto/detalle-novedad-rol-pago.response-dto';
import {DetalleNovedadRolPagoCreateDto} from './dto/detalle-novedad-rol-pago.create-dto';
import {DetalleNovedadRolPagoUpdateDto} from './dto/detalle-novedad-rol-pago.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpDetalleNovedadRolPagoService
  extends AbstractHttpService<DetalleNovedadRolPagoFindDto, DetalleNovedadRolPagoResponseDto, DetalleNovedadRolPagoCreateDto, DetalleNovedadRolPagoUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/detalle-novedad-rol-pago',
        http: _httpClient
      }
    );
  }
}
