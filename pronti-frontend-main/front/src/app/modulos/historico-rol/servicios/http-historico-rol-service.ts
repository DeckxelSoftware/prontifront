import {Injectable} from '@angular/core';
import {HistoricoRolFindDto} from './dto/historico-rol.find-dto';
import {HistoricoRolResponseDto} from './dto/historico-rol.response-dto';
import {HistoricoRolCreateDto} from './dto/historico-rol.create-dto';
import {HistoricoRolUpdateDto} from './dto/historico-rol.update-dto';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { AbstractHttpService } from '../../../abstract/http/abstract-http.service';

@Injectable()
export class HttpHistoricoRolService
  extends AbstractHttpService<HistoricoRolFindDto, HistoricoRolResponseDto, HistoricoRolCreateDto, HistoricoRolUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/historico-rol',
        http: _httpClient
      }
    );
  }
}
