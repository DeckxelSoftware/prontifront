import {Injectable} from '@angular/core';
import {CobroFindDto} from './dto/cobro.find-dto';
import {CobroResponseDto} from './dto/cobro.response-dto';
import {CobroCreateDto} from './dto/cobro.create-dto';
import {CobroUpdateDto} from './dto/cobro.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from "../../../abstract/http/abstract-http.service";
import {environment} from "../../../../environments/environment";
import {CobroInterface} from "../../cuota/rutas/ruta-cuota-cobro/ruta-cuota-cobro.component";

@Injectable()
export class  HttpCobroService
  extends AbstractHttpService<CobroFindDto, CobroResponseDto, CobroInterface, CobroUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/cobro',
        http: _httpClient
      }
    );
  }
}
