import {Pipe, PipeTransform} from '@angular/core';
import {EstadoFamiliarEnum} from '../enums/estado-familiar.enum';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha?: string): string {

    let strFecha = 'No registrado';
    if (fecha) {
      strFecha = fecha.split('T')[0];
    }
    return strFecha;
  }

}
