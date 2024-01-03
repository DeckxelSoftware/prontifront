import {Injectable} from '@angular/core';
import {AsientoContableDetAdicionalFindDto} from './dto/asiento-contable-det-adicional.find-dto';
import {AsientoContableDetAdicionalResponseDto} from './dto/asiento-contable-det-adicional.response-dto';
import {AsientoContableDetAdicionalCreateDto} from './dto/asiento-contable-det-adicional.create-dto';
import {AsientoContableDetAdicionalUpdateDto} from './dto/asiento-contable-det-adicional.update-dto';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';

@Injectable()
export class HttpAsientoContableDetAdicionalService
  extends AbstractHttpService<AsientoContableDetAdicionalFindDto, AsientoContableDetAdicionalResponseDto, AsientoContableDetAdicionalCreateDto, AsientoContableDetAdicionalUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/asiento-contable-det-adicional',
        http: _httpClient
      }
    );
  }
}
