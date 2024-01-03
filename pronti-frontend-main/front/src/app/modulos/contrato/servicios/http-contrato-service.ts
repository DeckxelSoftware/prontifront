import { Injectable } from '@angular/core';
import { ContratoFindDto } from './dto/contrato.find-dto';
import { ContratoResponseDto } from './dto/contrato.response-dto';
import { ContratoCreateDto } from './dto/contrato.create-dto';
import { ContratoUpdateDto } from './dto/contrato.update-dto';
import { HttpClient } from '@angular/common/http';
import { AbstractHttpService } from '../../../abstract/http/abstract-http.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class HttpContratoService
  extends AbstractHttpService<ContratoFindDto, ContratoResponseDto, ContratoCreateDto, ContratoUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/contrato',
        http: _httpClient
      }
    );
  }

  crearContrato(contrato: any) {
    console.log(this.URL);
    return this._httpClient.post(`${this.URL}/contrato/crear`, contrato, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

  cambiarPlazoContrato(contrato: any) {
    console.log(this.URL);
    return this._httpClient.put(`${this.URL}/contrato/actualizar/plazo`, contrato, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

  cambiarPlanContrato(contrato: any) {
    console.log(this.URL);
    return this._httpClient.put(`${this.URL}/contrato/actualizar/plan`, contrato, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }


  cambiarMontoContrato(contrato: any) {
    console.log(this.URL);
    return this._httpClient.put(`${this.URL}/contrato/actualizar/monto`, contrato, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }


  realizarUnificacion(contrato: any) {
    console.log(this.URL);
    return this._httpClient.put(`${this.URL}/contrato/actualizar/unificacion`, contrato, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

  desistirContrato(contrato: any) {
    return this._httpClient.put(`${this.URL}/contrato/actualizar/desistir`, contrato, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });
  }

  darCesionDerechos(contrato: any) {
    return this._httpClient.put(`${this.URL}/contrato/actualizar/cesion-derechos`, contrato, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });

  }

  reactivarContrato(contrato: any) {
    return this._httpClient.put(`${this.URL}/contrato/actualizar/reactivacion`, contrato, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });

  }

  actualizarFechaInicioContrato(fecha: string, historicoPlanContrato: number) {
    return this._httpClient.put(`${this.URL}/contrato/actualizar/fecha-inicio-contrato`, {
      fechaIniciaCobro: fecha,
      idHistoricoPlanContrato: historicoPlanContrato
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });

  }
  asambleaMes(mes: string): Observable<[ContratoResponseDto[], number]> {
    return this._httpClient.get<[ContratoResponseDto[], number]>(`${this.URL}/contrato/asamblea`, {
      params: {
        fecha: mes
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    });

  }

  moverDeGrupoContrato(idClienteGrupo: number): Observable<any> {
    return this._httpClient.post(`${this.URL}/contrato/mover-grupo`,
      {
        idClienteGrupo
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      }
    );
  }
}
