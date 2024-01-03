import {Pipe, PipeTransform} from "@angular/core";
import * as dayjs from "dayjs";

@Pipe({
  name: 'cantidadDiasEntreFechas'
})
export class CantidadDiasEntreFechasPipe implements PipeTransform {

  transform(fechaInicio: string, fechaFin: string, sumarDia: boolean = true) {
    if (fechaInicio && fechaFin) {
      if (sumarDia) {
        return dayjs(fechaFin).diff(fechaInicio, 'days') + 1;
      } else {
        return dayjs(fechaFin).diff(fechaInicio, 'days');
      }
    } else {
      return '';
    }
  }

}
