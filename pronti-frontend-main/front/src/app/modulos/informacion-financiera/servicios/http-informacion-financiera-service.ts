import {Injectable} from '@angular/core';
import {InformacionFinancieraFindDto} from './dto/informacion-financiera.find-dto';
import {InformacionFinancieraResponseDto} from './dto/informacion-financiera.response-dto';
import {InformacionFinancieraCreateDto} from './dto/informacion-financiera.create-dto';
import {InformacionFinancieraUpdateDto} from './dto/informacion-financiera.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpInformacionFinancieraService
  extends AbstractHttpService<InformacionFinancieraFindDto, InformacionFinancieraResponseDto, InformacionFinancieraCreateDto, InformacionFinancieraUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/informacion-financiera',
        http: _httpClient
      }
    );
  }
}
