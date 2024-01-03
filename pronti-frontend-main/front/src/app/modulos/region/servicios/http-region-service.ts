import {Injectable} from '@angular/core';
import {RegionFindDto} from './dto/region.find-dto';
import {RegionResponseDto} from './dto/region.response-dto';
import {RegionCreateDto} from './dto/region.create-dto';
import {RegionUpdateDto} from './dto/region.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpRegionService
  extends AbstractHttpService<RegionFindDto, RegionResponseDto, RegionCreateDto, RegionUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/region',
        http: _httpClient
      }
    );
  }
}
