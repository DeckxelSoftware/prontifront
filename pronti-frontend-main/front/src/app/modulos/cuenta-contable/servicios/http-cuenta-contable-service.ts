import {Injectable} from '@angular/core';
import {CuentaContableFindDto} from './dto/cuenta-contable.find-dto';
import {CuentaContableResponseDto} from './dto/cuenta-contable.response-dto';
import {CuentaContableCreateDto} from './dto/cuenta-contable.create-dto';
import {CuentaContableUpdateDto} from './dto/cuenta-contable.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpCuentaContableService
  extends AbstractHttpService<CuentaContableFindDto, CuentaContableResponseDto, CuentaContableCreateDto, CuentaContableUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/cuenta-contable',
        http: _httpClient
      }
    );
  }

  obtenerRegistrosBalanceComprobacion(find: CuentaContableFindDto){
    return this._httpClient.get(this.URL + '/cuenta-contable/todos', {
     params: {
      ...find
     } 
    });
  }
}
