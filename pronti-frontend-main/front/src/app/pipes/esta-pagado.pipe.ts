import {Pipe, PipeTransform} from '@angular/core';
import {EstadoPagoEnum} from '../enums/estado-pago.enum';

@Pipe({
  name: 'estaPagado'
})

export class EstaPagadoPipe implements PipeTransform {

  transform(estado?: EstadoPagoEnum): string {
    switch (estado) {
      case EstadoPagoEnum.pendiente:
        return 'Pendiente';
      case EstadoPagoEnum.cancelado:
        return 'Cancelado'
      default:
        return 'No registrado'
    }
  }

}
