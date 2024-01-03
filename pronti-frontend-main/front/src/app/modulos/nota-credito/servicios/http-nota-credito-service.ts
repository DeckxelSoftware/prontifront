import {Injectable} from '@angular/core';
import {NotaCreditoFindDto} from './dto/nota-credito.find-dto';
import {NotaCreditoResponseDto} from './dto/nota-credito.response-dto';
import {NotaCreditoCreateDto} from './dto/nota-credito.create-dto';
import {NotaCreditoUpdateDto} from './dto/nota-credito.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpNotaCreditoService
  extends AbstractHttpService<NotaCreditoFindDto, NotaCreditoResponseDto, NotaCreditoCreateDto, NotaCreditoUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/nota-credito',
        http: _httpClient
      }
    );
  }
}
