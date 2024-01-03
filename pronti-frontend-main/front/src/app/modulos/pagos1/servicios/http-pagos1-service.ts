import {Injectable} from '@angular/core';
import {Pagos1FindDto} from './dto/pagos1.find-dto';
import {Pagos1ResponseDto} from './dto/pagos1.response-dto';
import {Pagos1CreateDto} from './dto/pagos1.create-dto';
import {Pagos1UpdateDto} from './dto/pagos1.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from "../../../abstract/http/abstract-http.service";
import {environment} from "../../../../environments/environment";

@Injectable()
export class HttpPagos1Service
  extends AbstractHttpService<Pagos1FindDto, Pagos1ResponseDto, Pagos1CreateDto, Pagos1UpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/pagos1',
        http: _httpClient
      }
    );
  }

  decimoCuartoAnual(objetoCrear: Pagos1CreateDto) {
    return this._httpClient.post(`${this.URL}/pagos1/decimo-cuarto-anual`, objetoCrear, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }
  decimoTerceroAnual(objetoCrear: Pagos1CreateDto) {
    return this._httpClient.post(`${this.URL}/pagos1/decimo-tercero-anual`, objetoCrear, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }
}
