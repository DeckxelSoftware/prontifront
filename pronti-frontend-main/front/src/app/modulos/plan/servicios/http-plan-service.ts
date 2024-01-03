import {Injectable} from '@angular/core';
import {PlanFindDto} from './dto/plan.find-dto';
import {PlanResponseDto} from './dto/plan.response-dto';
import {PlanCreateDto} from './dto/plan.create-dto';
import {PlanUpdateDto} from './dto/plan.update-dto';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';

@Injectable()
export class HttpPlanService
  extends AbstractHttpService<PlanFindDto, PlanResponseDto, PlanCreateDto, PlanUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/plan',
        http: _httpClient
      }
    );
  }

  crearArrayDePlanes(planes: PlanCreateDto[]) {

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      })
    }
    return this._httpClient.post(this.URL + this.parameters.URLSection + '/array', {planes}, httpOptions)

  }
}
