import {Injectable} from '@angular/core';
import {DivisionAdministrativaFindDto} from './dto/division-administrativa.find-dto';
import {DivisionAdministrativaResponseDto} from './dto/division-administrativa.response-dto';
import {DivisionAdministrativaCreateDto} from './dto/division-administrativa.create-dto';
import {DivisionAdministrativaUpdateDto} from './dto/division-administrativa.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpDivisionAdministrativaService
  extends AbstractHttpService<DivisionAdministrativaFindDto, DivisionAdministrativaResponseDto, DivisionAdministrativaCreateDto, DivisionAdministrativaUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/division-administrativa',
        http: _httpClient
      }
    );
  }
}
