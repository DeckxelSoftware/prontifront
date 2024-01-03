import {Injectable} from '@angular/core';
import {ConfiguracionGeneralFindDto} from './dto/configuracion-general.find-dto';
import {ConfiguracionGeneralResponseDto} from './dto/configuracion-general.response-dto';
import {ConfiguracionGeneralCreateDto} from './dto/configuracion-general.create-dto';
import {ConfiguracionGeneralUpdateDto} from './dto/configuracion-general.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';
import {AsumeIvaEnum} from "../../../enums/asume-iva.enum";

@Injectable()
export class HttpConfiguracionGeneralService
  extends AbstractHttpService<ConfiguracionGeneralFindDto, ConfiguracionGeneralResponseDto, ConfiguracionGeneralCreateDto, ConfiguracionGeneralUpdateDto> {
  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/configuracion-general',
        http: _httpClient
      }
    );
  }

  actualizarIva(parametros: { idConfiguracion: string, ivaPorcentaje: number, asumeIva: AsumeIvaEnum }) {

    return this._httpClient.put(`${this.URL}/configuracion-general/iva/${parametros.idConfiguracion}`, {
        ivaPorcentaje: parametros.ivaPorcentaje,
        asumeIva: parametros.asumeIva
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
        }
      }
    )
  }
}
