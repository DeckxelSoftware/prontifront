import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";
import {EstadoPagoEnum} from '../../../../enums/estado-pago.enum';

export interface AbonoPrestamoFindDto extends AbstractFindDto {
  idPrestamo?: number;
  estaPagado?: EstadoPagoEnum;
}
