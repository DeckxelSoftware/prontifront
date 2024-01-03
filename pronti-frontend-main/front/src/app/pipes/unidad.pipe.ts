import {Pipe, PipeTransform} from '@angular/core';
import {CodigoAuxiliarRubrosRolEnum} from '../enums/codigo-auxiliar-rubros-rol.enum';
import {UnidadesEnum} from '../enums/unidades.enum';

@Pipe({
  name: 'unidad'
})
export class UnidadPipe implements PipeTransform {

  transform(unidad?: UnidadesEnum): string {
    let strUnidad = 'No registrado';
    switch (unidad) {
      case UnidadesEnum.valor:
        strUnidad = 'Valor'
        break;
      case UnidadesEnum.horas:
        strUnidad = 'Horas'
        break;
      case UnidadesEnum.dias:
        strUnidad = 'Días'
        break;
      default:
        break;

    }
    return strUnidad;
  }

}
