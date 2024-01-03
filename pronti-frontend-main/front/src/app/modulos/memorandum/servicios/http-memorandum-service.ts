import {Injectable} from '@angular/core';
import {MemorandumFindDto} from './dto/memorandum.find-dto';
import {MemorandumResponseDto} from './dto/memorandum.response-dto';
import {MemorandumCreateDto} from './dto/memorandum.create-dto';
import {MemorandumUpdateDto} from './dto/memorandum.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpMemorandumService
  extends AbstractHttpService<MemorandumFindDto, MemorandumResponseDto, MemorandumCreateDto, MemorandumUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/memorandum',
        http: _httpClient
      }
    );
  }
}
