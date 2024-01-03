import {Injectable} from '@angular/core';
import {VendedorFindDto} from './dto/vendedor.find-dto';
import {VendedorResponseDto} from './dto/vendedor.response-dto';
import {VendedorCreateDto} from './dto/vendedor.create-dto';
import {VendedorUpdateDto} from './dto/vendedor.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpVendedorService
  extends AbstractHttpService<VendedorFindDto, VendedorResponseDto, VendedorCreateDto, VendedorUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/vendedor',
        http: _httpClient
      }
    );
  }
}
