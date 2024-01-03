import {Injectable} from '@angular/core';
import {FacturaFindDto} from './dto/factura.find-dto';
import {FacturaResponseDto} from './dto/factura.response-dto';
import {FacturaCreateDto} from './dto/factura.create-dto';
import {FacturaUpdateDto} from './dto/factura.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpFacturaService
  extends AbstractHttpService<FacturaFindDto, FacturaResponseDto, FacturaCreateDto, FacturaUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/factura',
        http: _httpClient
      }
    );
  }
}
