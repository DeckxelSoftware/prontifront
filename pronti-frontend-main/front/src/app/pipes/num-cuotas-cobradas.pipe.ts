import {Pipe, PipeTransform} from "@angular/core";
import {SiNoEnum} from "../enums/si-no.enum";
import {CobroInterface} from "../modulos/cuota/rutas/ruta-cuota-cobro/ruta-cuota-cobro.component";

@Pipe({
  name: 'cuotasCobradas'
})
export class NumCuotasCobradasPipe implements PipeTransform {

  transform(cobro: CobroInterface): number[] {
    let numCuotas: number[] = [];
    cobro.pagos?.forEach(
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
