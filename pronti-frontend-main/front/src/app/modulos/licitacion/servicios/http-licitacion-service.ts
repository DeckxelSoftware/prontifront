import {Injectable} from '@angular/core';
import {LicitacionFindDto} from './dto/licitacion.find-dto';
import {LicitacionResponseDto} from './dto/licitacion.response-dto';
import {LicitacionCreateDto} from './dto/licitacion.create-dto';
import {LicitacionUpdateDto} from './dto/licitacion.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';
import { of, Observable, delay } from 'rxjs';

@Injectable()
export class HttpLicitacionService
  extends AbstractHttpService<LicitacionFindDto, LicitacionResponseDto, LicitacionCreateDto, LicitacionUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/licitacion',
        http: _httpClient
      }
    );
  }

  confirmarPreasamblea(preasamble: any): Observable<any>{
 
      return of(preasamble).pipe(delay(2000));
   
  }
}
