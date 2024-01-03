import {Pipe, PipeTransform} from "@angular/core";
import {CobroResponseDto} from "../modulos/cobro/servicios/dto/cobro.response-dto";

@Pipe({
  name: 'cuotasCobradasCuentas'
})
export class NumCuotasCobradasCuentasPipe implements PipeTransform {

  transform(cobro: CobroResponseDto): number[] {
    let numCuotas: number[] = [];
    cobro.pagoCollection?.forEach(
      pago => {
        pago.detallePago?.forEach(
          detalle => {
            if (detalle.numeroCuota) {
              numCuotas.push(detalle.numeroCuota);
            }
          }
        )
      }
    )
    if (numCuotas.length > 0) {
      const set = new Set(numCuotas);
      return [...set];
    } else {
      return [];
    }


  }

}
