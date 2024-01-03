import {Injectable} from '@angular/core';
import {PeriodoLaboralFindDto} from './dto/periodo-laboral.find-dto';
import {PeriodoLaboralResponseDto} from './dto/periodo-laboral.response-dto';
import {PeriodoLaboralCreateDto} from './dto/periodo-laboral.create-dto';
import {PeriodoLaboralUpdateDto} from './dto/periodo-laboral.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpPeriodoLaboralService
  extends AbstractHttpService<PeriodoLaboralFindDto, PeriodoLaboralResponseDto, PeriodoLaboralCreateDto, PeriodoLaboralUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/periodo-laboral',
        http: _httpClient
      }
    );
  }
}
