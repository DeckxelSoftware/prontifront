import {Injectable} from '@angular/core';
import {TransaccionAsientoContableFindDto} from './dto/transaccion-asiento-contable.find-dto';
import {TransaccionAsientoContableResponseDto} from './dto/transaccion-asiento-contable.response-dto';
import {TransaccionAsientoContableCreateDto} from './dto/transaccion-asiento-contable.create-dto';
import {TransaccionAsientoContableUpdateDto} from './dto/transaccion-asiento-contable.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from "../../../abstract/http/abstract-http.service";
import {environment} from "../../../../environments/environment";

@Injectable()
export class HttpTransaccionAsientoContableService
  extends AbstractHttpService<TransaccionAsientoContableFindDto, TransaccionAsientoContableResponseDto, TransaccionAsientoContableCreateDto, TransaccionAsientoContableUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/transaccion-asiento-contable',
        http: _httpClient
      }
    );
  }
}
