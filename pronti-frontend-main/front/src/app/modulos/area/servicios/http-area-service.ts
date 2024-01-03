import {Injectable} from '@angular/core';
import {AreaFindDto} from './dto/area.find-dto';
import {AreaResponseDto} from './dto/area.response-dto';
import {AreaCreateDto} from './dto/area.create-dto';
import {AreaUpdateDto} from './dto/area.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpAreaService
  extends AbstractHttpService<AreaFindDto, AreaResponseDto, AreaCreateDto, AreaUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/area',
        http: _httpClient
      }
    );
  }
}
