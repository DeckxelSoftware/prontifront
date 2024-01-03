import {Injectable} from '@angular/core';
import {RevisionFindDto} from './dto/revision.find-dto';
import {RevisionResponseDto} from './dto/revision.response-dto';
import {RevisionCreateDto} from './dto/revision.create-dto';
import {RevisionUpdateDto} from './dto/revision.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpRevisionService
  extends AbstractHttpService<RevisionFindDto, RevisionResponseDto, RevisionCreateDto, RevisionUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/revision',
        http: _httpClient
      }
    );
  }
}
