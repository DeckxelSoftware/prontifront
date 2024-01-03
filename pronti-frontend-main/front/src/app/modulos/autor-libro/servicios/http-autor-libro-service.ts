import {Injectable} from '@angular/core';
import {AutorLibroFindDto} from './dto/autor-libro.find-dto';
import {AutorLibroResponseDto} from './dto/autor-libro.response-dto';
import {AutorLibroCreateDto} from './dto/autor-libro.create-dto';
import {AutorLibroUpdateDto} from './dto/autor-libro.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpAutorLibroService
  extends AbstractHttpService<AutorLibroFindDto, AutorLibroResponseDto, AutorLibroCreateDto, AutorLibroUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/autor-libro',
        http: _httpClient
      }
    );
  }
}
