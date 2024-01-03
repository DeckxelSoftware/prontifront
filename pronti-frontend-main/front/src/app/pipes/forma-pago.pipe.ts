import {Pipe, PipeTransform} from '@angular/core';
import {FormaPagoEnum} from '../enums/forma-pago.enum';

@Pipe({
  name: 'formaPago'
})
export class FormaPagoPipe implements PipeTransform {

  transform(formaPago?: FormaPagoEnum): string {
    let strFormaPago = 'Sin definir';
    switch (formaPago) {
      case FormaPagoEnum.cheque:
        strFormaPago = 'Cheque'
        break;
      case FormaPagoEnum.transferencia:
        strFormaPago = 'Transferencia'
        break;
      default:
        break;

    }
    return strFormaPago;
  }

}
