import {Pipe, PipeTransform} from '@angular/core';
import {ModalidadDescuentoEnum} from '../enums/modalidad-descuento.enum';

@Pipe({
  name: 'modalidadDescuento'
})
export class ModalidadDescuentoPipe implements PipeTransform {

  transform(modalidad: ModalidadDescuentoEnum): string {

    switch (modalidad) {
      case ModalidadDescuentoEnum.decimoCuarto:
        return 'Décimo cuarto';
      case ModalidadDescuentoEnum.decimoTercero:
        return 'Décimo tercero';
      case ModalidadDescuentoEnum.rol:
        return 'Rol';
      case ModalidadDescuentoEnum.utilidades:
        return 'Utilidades';
      default:
        return 'No asignado';
    }
  }

}
