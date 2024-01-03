import {AbstractHttpParameters} from './interfaces/abstract-http-parameters';
import {ActivoInactivo} from '../../enums/activo-inactivo';
import {HttpHeaders, HttpHeaderResponse} from '@angular/common/http';

export abstract class AbstractHttpService<FindDto = any, ResponseDto = any, CreateDto = any, UpdateDto = any> {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    })
  }

  constructor(public URL: string, public parameters: AbstractHttpParameters) {


  }

  find(findParameters?: FindDto) {

    this.validateValues(findParameters);
    return this.parameters.http.get<[ResponseDto[], number]>(
      this.URL + this.parameters.URLSection + '/',
      {
        params: findParameters as any,
        ...this.httpOptions,
      },
    );
  }

  createOne(createParameters: CreateDto) {
    this.validateValues(createParameters);
    return this.parameters.http.post<ResponseDto>(
      this.URL + this.parameters.URLSection + '/',
      createParameters,
      this.httpOptions
    );
  }

  updateById(modifyParameters: UpdateDto, id: number) {
    this.validateValues(modifyParameters);
    return this.parameters.http.put<ResponseDto>(
      this.URL + this.parameters.URLSection + '/' + id,
      modifyParameters,
      this.httpOptions);
  }

  disable(disabled: boolean, id: number) {
    let valor = ActivoInactivo.Activo;
    if (disabled) {
      valor = ActivoInactivo.Activo
    } else {
      valor = ActivoInactivo.Inactivo
    }
    return this.parameters.http.put<ResponseDto>(
      this.URL + this.parameters.URLSection + '/' + id,
      {
        sisHabilitado: valor as any,
      },
      this.httpOptions);
  }

  validateValues(parameters: any) {
    if (parameters) {
      const keys = Object.keys(parameters);
      keys.forEach((x) => {
        if (parameters) {
          if (parameters[x] === undefined || parameters[x] === null || parameters[x] === '') {
            delete parameters[x];
          }
        }
      });
    }
  }
}
