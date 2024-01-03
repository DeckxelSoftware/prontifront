import {Injectable} from '@angular/core';
import {ChequeFindDto} from './dto/cheque.find-dto';
import {ChequeResponseDto} from './dto/cheque.response-dto';
import {ChequeCreateDto} from './dto/cheque.create-dto';
import {ChequeUpdateDto} from './dto/cheque.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpChequeService
  extends AbstractHttpService<ChequeFindDto, ChequeResponseDto, ChequeCreateDto, ChequeUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/cheque',
        http: _httpClient
      }
    );
  }
}
