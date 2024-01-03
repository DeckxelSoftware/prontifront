import {Injectable} from '@angular/core';
import {CargoFindDto} from './dto/cargo.find-dto';
import {CargoResponseDto} from './dto/cargo.response-dto';
import {CargoCreateDto} from './dto/cargo.create-dto';
import {CargoUpdateDto} from './dto/cargo.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpCargoService
  extends AbstractHttpService<CargoFindDto, CargoResponseDto, CargoCreateDto, CargoUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/cargo',
        http: _httpClient
      }
    );
  }
}
