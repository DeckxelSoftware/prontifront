import {Injectable} from '@angular/core';
import {CabeceraCompraFindDto} from './dto/cabecera-compra.find-dto';
import {CabeceraCompraResponseDto} from './dto/cabecera-compra.response-dto';
import {CabeceraCompraCreateDto} from './dto/cabecera-compra.create-dto';
import {CabeceraCompraUpdateDto} from './dto/cabecera-compra.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from "../../../abstract/http/abstract-http.service";
import {environment} from "../../../../environments/environment";

@Injectable()
export class HttpCabeceraCompraService
  extends AbstractHttpService<CabeceraCompraFindDto, CabeceraCompraResponseDto, CabeceraCompraCreateDto, CabeceraCompraUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/cabecera-compra',
        http: _httpClient
      }
    );
  }
}
