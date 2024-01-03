import {Injectable} from '@angular/core';
import {RubrosRolFindDto} from './dto/rubros-rol.find-dto';
import {RubrosRolResponseDto} from './dto/rubros-rol.response-dto';
import {RubrosRolCreateDto} from './dto/rubros-rol.create-dto';
import {RubrosRolUpdateDto} from './dto/rubros-rol.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpRubrosRolService
  extends AbstractHttpService<RubrosRolFindDto, RubrosRolResponseDto, RubrosRolCreateDto, RubrosRolUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/rubros-rol',
        http: _httpClient
      }
    );
  }
}
