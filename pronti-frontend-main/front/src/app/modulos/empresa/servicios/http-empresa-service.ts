import {Injectable} from '@angular/core';
import {EmpresaFindDto} from './dto/empresa.find-dto';
import {EmpresaResponseDto} from './dto/empresa.response-dto';
import {EmpresaCreateDto} from './dto/empresa.create-dto';
import {EmpresaUpdateDto} from './dto/empresa.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpEmpresaService
  extends AbstractHttpService<EmpresaFindDto, EmpresaResponseDto, EmpresaCreateDto, EmpresaUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/empresa',
        http: _httpClient
      }
    );
  }
}
