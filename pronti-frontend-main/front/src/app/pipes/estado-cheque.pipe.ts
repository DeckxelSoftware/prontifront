import {Pipe, PipeTransform} from '@angular/core';
import {EstadoChequeEnum} from '../enums/estado-cheque.enum';

@Pipe({
  name: 'estadoCheque'
})
export class EstadoChequePipe implements PipeTransform {

  transform(estadoCheque?: EstadoChequeEnum): string {
    let strEstadoCheque = '';
    switch (estadoCheque) {
      case EstadoChequeEnum.cobrado:
        strEstadoCheque = 'Cobrado'
        break;
      case EstadoChequeEnum.usado:
        strEstadoCheque = 'Usado'
        break;
      case EstadoChequeEnum.libre:
        strEstadoCheque = 'Libre'
        break;
      case EstadoChequeEnum.anulado:
        strEstadoCheque = 'Anulado'
        break;
      default:
        break;

    }
    return strEstadoCheque;
  }

}
