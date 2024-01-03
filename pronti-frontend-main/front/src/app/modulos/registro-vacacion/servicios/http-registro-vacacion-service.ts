import {Injectable} from '@angular/core';
import {RegistroVacacionFindDto} from './dto/registro-vacacion.find-dto';
import {RegistroVacacionResponseDto} from './dto/registro-vacacion.response-dto';
import {RegistroVacacionCreateDto} from './dto/registro-vacacion.create-dto';
import {RegistroVacacionUpdateDto} from './dto/registro-vacacion.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from "../../../abstract/http/abstract-http.service";
import {environment} from "../../../../environments/environment";

@Injectable()
export class HttpRegistroVacacionService
  extends AbstractHttpService<RegistroVacacionFindDto, RegistroVacacionResponseDto, RegistroVacacionCreateDto, RegistroVacacionUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/registro-vacacion',
        http: _httpClient
      }
    );
  }
}
