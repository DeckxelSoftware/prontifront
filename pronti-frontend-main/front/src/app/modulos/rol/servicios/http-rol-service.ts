import {Injectable} from '@angular/core';
import {RolFindDto} from './dto/rol.find-dto';
import {RolResponseDto} from './dto/rol.response-dto';
import {RolCreateDto} from './dto/rol.create-dto';
import {RolUpdateDto} from './dto/rol.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpRolService
  extends AbstractHttpService<RolFindDto, RolResponseDto, RolCreateDto, RolUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/rol',
        http: _httpClient
      }
    );
  }
}
