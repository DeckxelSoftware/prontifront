import {Injectable} from '@angular/core';
import {SriGastosFindDto} from './dto/sri-gastos.find-dto';
import {SriGastosResponseDto} from './dto/sri-gastos.response-dto';
import {SriGastosCreateDto} from './dto/sri-gastos.create-dto';
import {SriGastosUpdateDto} from './dto/sri-gastos.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from "../../../abstract/http/abstract-http.service";
import {environment} from "../../../../environments/environment";

@Injectable()
export class HttpSriGastosService
  extends AbstractHttpService<SriGastosFindDto, SriGastosResponseDto, SriGastosCreateDto, SriGastosUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/sri-gastos',
        http: _httpClient
      }
    );
  }
}
