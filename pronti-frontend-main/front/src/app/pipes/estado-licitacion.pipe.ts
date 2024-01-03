import {Pipe, PipeTransform} from '@angular/core';
import {EstadoLicitacionEnum} from '../enums/estado-licitacion.enum';

@Pipe({
  name: 'estadoLicitacion'
})
export class EstadoLicitacionPipe implements PipeTransform {

  transform(estado?: EstadoLicitacionEnum): string {


    switch (estado) {
      case EstadoLicitacionEnum.noAplica:
        return 'No aplica';
      case EstadoLicitacionEnum.siAplica:
        return 'Si aplica';
      case EstadoLicitacionEnum.aprobadoPorGerencia:
        return 'Aprobado por gerencia';
      default:
        return 'No registrado';
    }

  }

}
