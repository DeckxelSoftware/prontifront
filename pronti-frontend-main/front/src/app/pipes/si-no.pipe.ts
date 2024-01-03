import {Pipe, PipeTransform} from '@angular/core';
import {ActivoInactivo} from '../enums/activo-inactivo';
import {SiNoEnum} from '../enums/si-no.enum';

@Pipe({
  name: 'siNo'
})
export class SiNoPipe implements PipeTransform {

  transform(opcionSiNo?: SiNoEnum): string {
    return opcionSiNo === SiNoEnum.SI ? 'Si' : 'No';
  }

}
