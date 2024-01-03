import {Injectable} from '@angular/core';
import {SubgrupoContableFindDto} from './dto/subgrupo-contable.find-dto';
import {SubgrupoContableResponseDto} from './dto/subgrupo-contable.response-dto';
import {SubgrupoContableCreateDto} from './dto/subgrupo-contable.create-dto';
import {SubgrupoContableUpdateDto} from './dto/subgrupo-contable.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpSubgrupoContableService
  extends AbstractHttpService<SubgrupoContableFindDto, SubgrupoContableResponseDto, SubgrupoContableCreateDto, SubgrupoContableUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/subgrupo-contable',
        http: _httpClient
      }
    );
  }
}
