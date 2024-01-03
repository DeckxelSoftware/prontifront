import {Injectable} from '@angular/core';
import {ChequeraFindDto} from './dto/chequera.find-dto';
import {ChequeraResponseDto} from './dto/chequera.response-dto';
import {ChequeraCreateDto} from './dto/chequera.create-dto';
import {ChequeraUpdateDto} from './dto/chequera.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpChequeraService
  extends AbstractHttpService<ChequeraFindDto, ChequeraResponseDto, ChequeraCreateDto, ChequeraUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/chequera',
        http: _httpClient
      }
    );
  }
}
