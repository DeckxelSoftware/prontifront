import {Injectable} from '@angular/core';
import {PrecioFindDto} from './dto/precio.find-dto';
import {PrecioResponseDto} from './dto/precio.response-dto';
import {PrecioCreateDto} from './dto/precio.create-dto';
import {PrecioUpdateDto} from './dto/precio.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpPrecioService
  extends AbstractHttpService<PrecioFindDto, PrecioResponseDto, PrecioCreateDto, PrecioUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/precio',
        http: _httpClient
      }
    );
  }
}
