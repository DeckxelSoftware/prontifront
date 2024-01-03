import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'codigoImpuesto'
})
export class CodigoImpuestoPipe implements PipeTransform {

  transform(codigoImpuesto?: string): string {
    let strGenero = '';
    switch (codigoImpuesto) {
      case '2':
        strGenero = 'IVA'
        break;
      case '3':
        strGenero = 'ICE'
        break;
      case '5':
        strGenero = 'IRBPNR'
        break;
      default:
        break;

    }
    return strGenero;
  }

}
