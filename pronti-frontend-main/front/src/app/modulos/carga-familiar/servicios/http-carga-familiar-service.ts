import {Injectable} from '@angular/core';
import {CargaFamiliarFindDto} from './dto/carga-familiar.find-dto';
import {CargaFamiliarResponseDto} from './dto/carga-familiar.response-dto';
import {CargaFamiliarCreateDto} from './dto/carga-familiar.create-dto';
import {CargaFamiliarUpdateDto} from './dto/carga-familiar.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpCargaFamiliarService
  extends AbstractHttpService<CargaFamiliarFindDto, CargaFamiliarResponseDto, CargaFamiliarCreateDto, CargaFamiliarUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/carga-familiar',
        http: _httpClient
      }
    );
  }
}
