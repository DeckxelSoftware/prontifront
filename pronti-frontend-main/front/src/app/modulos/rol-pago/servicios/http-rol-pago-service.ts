import {Injectable} from '@angular/core';
import {RolPagoFindDto} from './dto/rol-pago.find-dto';
import {RolPagoResponseDto} from './dto/rol-pago.response-dto';
import {RolPagoCreateDto} from './dto/rol-pago.create-dto';
import {RolPagoUpdateDto} from './dto/rol-pago.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from "../../../abstract/http/abstract-http.service";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

@Injectable()
export class HttpRolPagoService
  extends AbstractHttpService<RolPagoFindDto, RolPagoResponseDto, RolPagoCreateDto, RolPagoUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/rol-pago',
        http: _httpClient
      }
    );
  }

  calcularRolPagos() {

    return this._httpClient.post(`${this.URL}/rol-pago/calcular-rol`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });

  }

  cerrarRol() {

    return this._httpClient.post(`${this.URL}/rol-pago/cerrar-rol`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });

  }

  reporteProvisiones(idPeriodoLaboral: number){
    return this._httpClient.get(`${this.URL}/rol-pago/todos`,{ params: {idPeriodoLaboral},
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })

  }

  findAll(findDto: RolPagoFindDto): Observable<any> {
    return this._httpClient.get(`${this.URL}/rol-pago/todos`, {
      params: {
        ...findDto
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }
}
