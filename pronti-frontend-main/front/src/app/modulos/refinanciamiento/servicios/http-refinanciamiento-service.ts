import {Injectable} from '@angular/core';
import {RefinanciamientoFindDto} from './dto/refinanciamiento.find-dto';
import {RefinanciamientoResponseDto} from './dto/refinanciamiento.response-dto';
import {RefinanciamientoCreateDto} from './dto/refinanciamiento.create-dto';
import {RefinanciamientoUpdateDto} from './dto/refinanciamiento.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpRefinanciamientoService
  extends AbstractHttpService<RefinanciamientoFindDto, RefinanciamientoResponseDto, RefinanciamientoCreateDto, RefinanciamientoUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/refinanciamiento',
        http: _httpClient
      }
    );
  }
}
