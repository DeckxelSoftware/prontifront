import {Pipe, PipeTransform} from '@angular/core';
import {EstadoPrestamoEnum} from '../enums/estado-prestamo.enum';

@Pipe({
  name: 'estadoPrestamo'
})
export class EstadoPrestamoPipe implements PipeTransform {

  transform(estado?: EstadoPrestamoEnum): string {


    switch (estado) {
      case EstadoPrestamoEnum.pendiente:
        return 'Pendiente';
      case EstadoPrestamoEnum.pagado:
        return 'Pagado';
      default:
        return 'No registrado';
    }

  }

}
