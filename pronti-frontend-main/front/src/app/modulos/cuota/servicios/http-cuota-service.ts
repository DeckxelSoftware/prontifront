import {Injectable} from '@angular/core';
import {CuotaFindDto} from './dto/cuota.find-dto';
import {CuotaResponseDto} from './dto/cuota.response-dto';
import {CuotaCreateDto} from './dto/cuota.create-dto';
import {CuotaUpdateDto} from './dto/cuota.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpCuotaService
  extends AbstractHttpService<CuotaFindDto, CuotaResponseDto, CuotaCreateDto, CuotaUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/cuota',
        http: _httpClient
      }
    );
  }
}
