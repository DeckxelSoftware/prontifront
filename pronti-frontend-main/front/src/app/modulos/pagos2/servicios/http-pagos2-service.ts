import { Injectable } from '@angular/core';
import { Pagos2FindDto } from './dto/pagos2.find-dto';
import { Pagos2ResponseDto } from './dto/pagos2.response-dto';
import { Pagos2CreateDto } from './dto/pagos2.create-dto';
import { Pagos2UpdateDto } from './dto/pagos2.update-dto';
import { HttpClient } from '@angular/common/http';
import { AbstractHttpService } from "../../../abstract/http/abstract-http.service";
import { environment } from "../../../../environments/environment";

@Injectable()
export class HttpPagos2Service
  extends AbstractHttpService<Pagos2FindDto, Pagos2ResponseDto, Pagos2CreateDto, Pagos2UpdateDto>{
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/pagos2',
        http: _httpClient
      }
    );
  }

  calcularUtilidades() {
    return this._httpClient.post(`${this.URL}/pagos2/calcular-utilidades`, 
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
  }

  obtenerPagos2Todos(){
    return this._httpClient.get(`${this.URL}/pagos2/todos`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

}
