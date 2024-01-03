import {Pipe, PipeTransform} from '@angular/core';
import {TipoCuentaEnum} from '../enums/tipo-cuenta.enum';
import {TipoMovimientoEnum} from '../enums/tipo-movimiento.enum';

@Pipe({
  name: 'tipoMovimiento'
})
export class TipoMovimientoPipe implements PipeTransform {

  transform(tipoMovimiento: string): string {
    let strTipoMovimiento = '';
    switch (tipoMovimiento) {
      case TipoMovimientoEnum.mayor:
        strTipoMovimiento = 'Mayor'
        break;
      case TipoMovimientoEnum.auxiliar:
        strTipoMovimiento = 'Auxiliar'
        break;
    }
    return strTipoMovimiento;
  }

}
