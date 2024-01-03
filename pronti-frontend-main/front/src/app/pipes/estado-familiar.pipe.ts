import {Pipe, PipeTransform} from '@angular/core';
import {EstadoFamiliarEnum} from '../enums/estado-familiar.enum';

@Pipe({
  name: 'estadoFamliar'
})
export class EstadoFamiliarPipe implements PipeTransform {

  transform(estado?: EstadoFamiliarEnum): string {
    let strEstado = 'Sin definir';
    switch (estado) {
      case EstadoFamiliarEnum.padre:
        strEstado = 'Padre'
        break;
      case EstadoFamiliarEnum.madre:
        strEstado = 'Madre'
        break;
      case EstadoFamiliarEnum.noAplica:
        strEstado = 'No aplica'
        break;
      default:
        break;

    }
    return strEstado;
  }

}
