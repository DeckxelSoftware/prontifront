import {Injectable} from '@angular/core';
import {HistorialLaboralFindDto} from './dto/historial-laboral.find-dto';
import {HistorialLaboralResponseDto} from './dto/historial-laboral.response-dto';
import {HistorialLaboralCreateDto} from './dto/historial-laboral.create-dto';
import {HistorialLaboralUpdateDto} from './dto/historial-laboral.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpHistorialLaboralService
  extends AbstractHttpService<HistorialLaboralFindDto, HistorialLaboralResponseDto, HistorialLaboralCreateDto, HistorialLaboralUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/historial-laboral',
        http: _httpClient
      }
    );
  }
}
