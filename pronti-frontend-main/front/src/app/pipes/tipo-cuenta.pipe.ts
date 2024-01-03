import {Pipe, PipeTransform} from '@angular/core';
import {TipoCuentaEnum} from '../enums/tipo-cuenta.enum';

@Pipe({
  name: 'tipoCuenta'
})
export class TipoCuentaPipe implements PipeTransform {

  transform(tipoCuenta: string): string {
    let strTipoCuenta = '';
    switch (tipoCuenta) {
      case TipoCuentaEnum.deudora:
        strTipoCuenta = 'Deudora'
        break;
      case TipoCuentaEnum.acreedora:
        strTipoCuenta = 'Acreedora'
        break;
    }
    return strTipoCuenta;
  }

}
