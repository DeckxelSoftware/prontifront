import {Injectable} from '@angular/core';
import {SupervisorFindDto} from './dto/supervisor.find-dto';
import {SupervisorResponseDto} from './dto/supervisor.response-dto';
import {SupervisorCreateDto} from './dto/supervisor.create-dto';
import {SupervisorUpdateDto} from './dto/supervisor.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpSupervisorService
  extends AbstractHttpService<SupervisorFindDto, SupervisorResponseDto, SupervisorCreateDto, SupervisorUpdateDto>{
  constructor(private readonly _httpClient:HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/supervisor',
        http: _httpClient
      }
    );
  }
}
