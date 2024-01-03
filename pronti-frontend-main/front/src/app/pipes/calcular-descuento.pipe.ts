import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'calcularDescuento'
})
export class CalcularDescuentoPipe implements PipeTransform {

  transform(valor: number, dscto: number): number {
    console.log({valor, dscto})
    if (dscto > 0) {
      return valor - (valor * (dscto / 100))
    } else {
      return valor;
    }

  }

}
