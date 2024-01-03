import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'saldoCuota'
})
export class SaldoCuotaPipe implements PipeTransform {

  transform(cuota: number | undefined, cobrado: number | undefined): number {
    if (typeof cuota ==="number"&& typeof cobrado==="number" ) {
      return cuota - cobrado;
    } else {
      return 0.00
    }

  }

}
