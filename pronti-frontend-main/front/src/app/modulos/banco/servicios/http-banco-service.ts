import {Injectable} from '@angular/core';
import {BancoFindDto} from './dto/banco.find-dto';
import {BancoResponseDto} from './dto/banco.response-dto';
import {BancoCreateDto} from './dto/banco.create-dto';
import {BancoUpdateDto} from './dto/banco.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpBancoService
  extends AbstractHttpService<BancoFindDto, BancoResponseDto, BancoCreateDto, BancoUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/banco',
        http: _httpClient
      }
    );
  }
}
