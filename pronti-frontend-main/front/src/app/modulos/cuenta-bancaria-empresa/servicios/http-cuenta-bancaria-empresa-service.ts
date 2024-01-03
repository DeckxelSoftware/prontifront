import {Injectable} from '@angular/core';
import {CuentaBancariaEmpresaFindDto} from './dto/cuenta-bancaria-empresa.find-dto';
import {CuentaBancariaEmpresaResponseDto} from './dto/cuenta-bancaria-empresa.response-dto';
import {CuentaBancariaEmpresaCreateDto} from './dto/cuenta-bancaria-empresa.create-dto';
import {CuentaBancariaEmpresaUpdateDto} from './dto/cuenta-bancaria-empresa.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpCuentaBancariaEmpresaService
  extends AbstractHttpService<CuentaBancariaEmpresaFindDto, CuentaBancariaEmpresaResponseDto, CuentaBancariaEmpresaCreateDto, CuentaBancariaEmpresaUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/cuenta-bancaria-empresa',
        http: _httpClient
      }
    );
  }
}
