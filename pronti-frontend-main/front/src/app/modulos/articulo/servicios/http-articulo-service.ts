import {Injectable} from '@angular/core';
import {ArticuloFindDto} from './dto/articulo.find-dto';
import {ArticuloResponseDto} from './dto/articulo.response-dto';
import {ArticuloCreateDto} from './dto/articulo.create-dto';
import { ArticuloUpdateDto } from './dto/articulo.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from "../../../abstract/http/abstract-http.service";
import {environment} from "../../../../environments/environment";

@Injectable()
export class HttpArticuloService
  extends AbstractHttpService<ArticuloFindDto, ArticuloResponseDto, ArticuloCreateDto, ArticuloUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/articulo',
        http: _httpClient
      }
    );
  }

  editarArticulo(id: number, parametrosArticulo: ArticuloUpdateDto){
    return this._httpClient.put( `${this.URL}/articulo/custom/${id}`, parametrosArticulo, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    } );
  }
}
