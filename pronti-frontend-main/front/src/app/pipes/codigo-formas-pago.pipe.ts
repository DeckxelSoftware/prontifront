import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'codigoFormaPago'
})
export class CodigoFormasPagoPipe implements PipeTransform {

  transform(codigoFormaPago?: string): string {
    let strFormaPago = '';
    switch (codigoFormaPago) {
      case '01':
        strFormaPago = 'SIN UTILIZACIÓN DEL SISTEMA FINANCIERO'
        break;
      case '15':
        strFormaPago = 'COMPENSACIÓN DE DEUDAS'
        break;
      case '16':
        strFormaPago = 'TARJETA DE DÉBITO'
        break;
      case '17':
        strFormaPago = 'DINERO ELECTRÓNICO'
        break;
      case '18':
        strFormaPago = 'TARJETA PREPAGO'
        break;
      case '19':
        strFormaPago = 'TARJETA DE CRÉDITO'
        break;
      case '20':
        strFormaPago = 'OTROS CON UTILIZACIÓN DEL SISTEMA FINANCIERO'
        break;
      case '21':
        strFormaPago = 'ENDOSO DE TÍTULOS'
        break;
      default:
        break;

    }
    return strFormaPago;
  }

}
