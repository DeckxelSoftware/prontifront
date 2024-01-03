import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'cuotasPorPagar'
})

export class CuotasPorPagarPipe implements PipeTransform {

  transform(plazo?: number, cuotasCobradas?: number): number {
    if (plazo && cuotasCobradas) {
      return plazo - cuotasCobradas
    } else {
      return 0;
    }
  }

}
