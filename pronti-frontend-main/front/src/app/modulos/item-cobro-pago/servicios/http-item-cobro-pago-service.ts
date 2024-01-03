import {Injectable} from '@angular/core';
import {ItemCobroPagoFindDto} from './dto/item-cobro-pago.find-dto';
import {ItemCobroPagoResponseDto} from './dto/item-cobro-pago.response-dto';
import {ItemCobroPagoCreateDto} from './dto/item-cobro-pago.create-dto';
import {ItemCobroPagoUpdateDto} from './dto/item-cobro-pago.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpItemCobroPagoService
  extends AbstractHttpService<ItemCobroPagoFindDto, ItemCobroPagoResponseDto, ItemCobroPagoCreateDto, ItemCobroPagoUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/item-cobro-pago',
        http: _httpClient
      }
    );
  }
}
