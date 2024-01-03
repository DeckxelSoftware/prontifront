import {Pipe, PipeTransform} from '@angular/core';
import {TipoTransaccionEnum} from '../enums/tipo-transaccion.enum';

@Pipe({
  name: 'tipoTransaccion'
})
export class TipoTransaccionPipe implements PipeTransform {

  transform(value: string): string {
    let salida = '';
    switch (value) {
      case TipoTransaccionEnum.Transferencia:
        salida = 'Transferencia';
        break;
      case TipoTransaccionEnum.Egreso:
        salida = 'Egreso';
        break;
      case TipoTransaccionEnum.Diario:
        salida = 'Diario';
        break;
      case TipoTransaccionEnum.Ingreso:
        salida = 'Ingreso';
        break;
      default:
        salida = 'No tiene'

    }
    return salida;
  }

}
