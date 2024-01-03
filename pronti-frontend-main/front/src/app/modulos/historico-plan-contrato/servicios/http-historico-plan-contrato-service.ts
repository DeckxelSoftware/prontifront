import {Injectable} from '@angular/core';
import {HistoricoPlanContratoFindDto} from './dto/historico-plan-contrato.find-dto';
import {HistoricoPlanContratoResponseDto} from './dto/historico-plan-contrato.response-dto';
import {HistoricoPlanContratoCreateDto} from './dto/historico-plan-contrato.create-dto';
import {HistoricoPlanContratoUpdateDto} from './dto/historico-plan-contrato.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpHistoricoPlanContratoService
  extends AbstractHttpService<HistoricoPlanContratoFindDto, HistoricoPlanContratoResponseDto, HistoricoPlanContratoCreateDto, HistoricoPlanContratoUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/historico-planAnterior-contrato',
        http: _httpClient
      }
    );
  }
}
