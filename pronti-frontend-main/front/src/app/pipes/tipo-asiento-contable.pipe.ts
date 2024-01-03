import {Pipe, PipeTransform} from '@angular/core';
import {TipoAsientoContableEnum} from '../enums/tipo-asiento-contable.enum';

@Pipe({
  name: 'tipoAsientoContable'
})
export class TipoAsientoContablePipe implements PipeTransform {

  transform(value: string): string {
    let salida = '';
    switch (value) {
      case TipoAsientoContableEnum.Banco:
        salida = 'Banco';
        break;
      case TipoAsientoContableEnum.Cheque:
        salida = 'Cheque';
        break;
      case TipoAsientoContableEnum.Efectivo:
        salida = 'Efectivo';
        break;
      case TipoAsientoContableEnum.MedioDigital:
        salida = 'Medio Digital';
        break;
      default:
        salida = 'No tiene'
    }
    return salida;
  }

}
