import {Injectable} from '@angular/core';
import {LineaImpuestoFindDto} from './dto/linea-impuesto.find-dto';
import {LineaImpuestoResponseDto} from './dto/linea-impuesto.response-dto';
import {LineaImpuestoCreateDto} from './dto/linea-impuesto.create-dto';
import {LineaImpuestoUpdateDto} from './dto/linea-impuesto.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from "../../../abstract/http/abstract-http.service";
import {environment} from "../../../../environments/environment";

@Injectable()
export class HttpLineaImpuestoService
  extends AbstractHttpService<LineaImpuestoFindDto, LineaImpuestoResponseDto, LineaImpuestoCreateDto, LineaImpuestoUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/linea-impuesto',
        http: _httpClient
      }
    );
  }
}
