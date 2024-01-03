import {Injectable} from '@angular/core';
import {PeriodoContableFindDto} from './dto/periodo-contable.find-dto';
import {PeriodoContableResponseDto} from './dto/periodo-contable.response-dto';
import {PeriodoContableCreateDto} from './dto/periodo-contable.create-dto';
import {PeriodoContableUpdateDto} from './dto/periodo-contable.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpPeriodoContableService
  extends AbstractHttpService<PeriodoContableFindDto, PeriodoContableResponseDto, PeriodoContableCreateDto, PeriodoContableUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/periodo-contable',
        http: _httpClient
      }
    );
  }
}
