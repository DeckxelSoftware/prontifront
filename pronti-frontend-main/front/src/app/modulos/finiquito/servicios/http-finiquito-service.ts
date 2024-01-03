import {Injectable} from '@angular/core';
import {FiniquitoFindDto} from './dto/finiquito.find-dto';
import {FiniquitoResponseDto} from './dto/finiquito.response-dto';
import {FiniquitoCreateDto} from './dto/finiquito.create-dto';
import {FiniquitoUpdateDto} from './dto/finiquito.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from "../../../abstract/http/abstract-http.service";
import {environment} from "../../../../environments/environment";

@Injectable()
export class HttpFiniquitoService
  extends AbstractHttpService<FiniquitoFindDto, FiniquitoResponseDto, FiniquitoCreateDto, FiniquitoUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/finiquito',
        http: _httpClient
      }
    );
  }
}
