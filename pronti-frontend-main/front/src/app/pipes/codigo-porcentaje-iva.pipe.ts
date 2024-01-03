import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'codigoPorcentajeIva'
})
export class CodigoPorcentajeIvaPipe implements PipeTransform {

  transform(codigoPorcentajeIva?: string): string {
    let strPorcentajeIva = '';
    switch (codigoPorcentajeIva) {
      case '0':
        strPorcentajeIva = '0%'
        break;
      case '2':
        strPorcentajeIva = '12%'
        break;
      case '3':
        strPorcentajeIva = '14%'
        break;
      case '6':
        strPorcentajeIva = 'No objeto de impuesto'
        break;
      case '7':
        strPorcentajeIva = 'Exento de IVA'
        break;
      default:
        break;

    }
    return strPorcentajeIva;
  }

}
