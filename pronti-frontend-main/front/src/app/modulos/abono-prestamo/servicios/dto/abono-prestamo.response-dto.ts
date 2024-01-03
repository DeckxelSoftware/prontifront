import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {ModalidadDescuentoEnum} from '../../../../enums/modalidad-descuento.enum';
import {MesEnum} from '../../../../enums/mes.enum';
import {EstadoPagoEnum} from '../../../../enums/estado-pago.enum';

export interface AbonoPrestamoResponseDto extends AbstractResponseDto {
  // nombre?: string;
  fechaPago?: string;
  numeroPago?: number;
  modalidadDescuento?: ModalidadDescuentoEnum;
  mes?: MesEnum;
  anio?: number;
  valorCuota?: number;
  estaPagado?: EstadoPagoEnum;
  valorTasaInteres?: number;
  comprobanteEgreso?: string;
  valorCapital?: number;
  saldo?: number;

}
