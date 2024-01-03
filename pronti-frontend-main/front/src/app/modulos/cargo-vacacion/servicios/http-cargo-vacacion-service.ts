import {Injectable} from '@angular/core';
import {CargoVacacionFindDto} from './dto/cargo-vacacion.find-dto';
import {CargoVacacionResponseDto} from './dto/cargo-vacacion.response-dto';
import {CargoVacacionCreateDto} from './dto/cargo-vacacion.create-dto';
import {CargoVacacionUpdateDto} from './dto/cargo-vacacion.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpCargoVacacionService
  extends AbstractHttpService<CargoVacacionFindDto, CargoVacacionResponseDto, CargoVacacionCreateDto, CargoVacacionUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/cargo-vacacion',
        http: _httpClient
      }
    );
  }

  obtenerTodosCargoVacacion(){
    return this._httpClient.get(this.URL+ `/cargo-vacacion/todos`);
  }
}
