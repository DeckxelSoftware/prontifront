import {Injectable} from '@angular/core';
import {PreasambleaFindDto} from './dto/preasamblea.find-dto';
import {PreasambleaResponseDto} from './dto/preasamblea.response-dto';
import {PreasambleaCreateDto} from './dto/preasamblea.create-dto';
import {PreasambleaUpdateDto} from './dto/preasamblea.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from "../../../abstract/http/abstract-http.service";
import {environment} from "../../../../environments/environment";

@Injectable()
export class HttpPreasambleaService
  extends AbstractHttpService<PreasambleaFindDto, PreasambleaResponseDto, PreasambleaCreateDto, PreasambleaUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/preasamblea',
        http: _httpClient
      }
    );
  }
}
