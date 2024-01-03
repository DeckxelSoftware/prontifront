import {ModalidadDescuentoEnum} from '../../../../enums/modalidad-descuento.enum';
import {MesEnum} from '../../../../enums/mes.enum';
import {EstadoPagoEnum} from '../../../../enums/estado-pago.enum';

export interface AbonoPrestamoCreateDto {
  fechaPago: string;
  numeroPago: number;
  modalidadDescuento: ModalidadDescuentoEnum;
  mes: MesEnum;
  anio: number;
  valorCuota: number;
  idPrestamo: number;
  estaPagado: EstadoPagoEnum;
}
