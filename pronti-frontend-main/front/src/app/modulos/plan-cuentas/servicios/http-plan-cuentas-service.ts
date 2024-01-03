import {Injectable} from '@angular/core';
import {PlanCuentasFindDto} from './dto/plan-cuentas.find-dto';
import {PlanCuentasResponseDto} from './dto/plan-cuentas.response-dto';
import {PlanCuentasCreateDto} from './dto/plan-cuentas.create-dto';
import {PlanCuentasUpdateDto} from './dto/plan-cuentas.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpPlanCuentasService
  extends AbstractHttpService<PlanCuentasFindDto, PlanCuentasResponseDto, PlanCuentasCreateDto, PlanCuentasUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/cuenta-contable',
        http: _httpClient
      }
    );
  }
}
