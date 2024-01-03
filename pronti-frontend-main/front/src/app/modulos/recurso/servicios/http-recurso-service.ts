import {Injectable} from '@angular/core';
import {RecursoFindDto} from './dto/recurso.find-dto';
import {RecursoResponseDto} from './dto/recurso.response-dto';
import {RecursoCreateDto} from './dto/recurso.create-dto';
import {RecursoUpdateDto} from './dto/recurso.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from "../../../abstract/http/abstract-http.service";
import {environment} from "../../../../environments/environment";

@Injectable()
export class HttpRecursoService
  extends AbstractHttpService<RecursoFindDto, RecursoResponseDto, RecursoCreateDto, RecursoUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/recurso',
        http: _httpClient
      }
    );
  }
}
