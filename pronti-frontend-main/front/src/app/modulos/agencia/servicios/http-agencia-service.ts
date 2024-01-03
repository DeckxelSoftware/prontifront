import {Injectable} from '@angular/core';
import {AgenciaFindDto} from './dto/agencia.find-dto';
import {AgenciaResponseDto} from './dto/agencia.response-dto';
import {AgenciaCreateDto} from './dto/agencia.create-dto';
import {AgenciaUpdateDto} from './dto/agencia.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpAgenciaService
  extends AbstractHttpService<AgenciaFindDto, AgenciaResponseDto, AgenciaCreateDto, AgenciaUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/agencia',
        http: _httpClient
      }
    );
  }
}
