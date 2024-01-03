import {Injectable} from '@angular/core';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {LibroBibliotecaFindDto} from './dto/libro-biblioteca.find-dto';
import {LibroBibliotecaResponseDto} from './dto/libro-biblioteca.response-dto';
import {LibroBibliotecaCreateDto} from './dto/libro-biblioteca.create-dto';
import {LibroBibliotecaUpdateDto} from './dto/libro-biblioteca.update-dto';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class HttpLibroBibliotecaService
  extends AbstractHttpService<LibroBibliotecaFindDto, LibroBibliotecaResponseDto, LibroBibliotecaCreateDto, LibroBibliotecaUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/libro-biblioteca',
        http: _httpClient
      }
    );
  }
}
