import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {AbonoPrestamoResponseDto} from '../../../abono-prestamo/servicios/dto/abono-prestamo.response-dto';
import {TrabajadorResponseDto} from "../../../trabajador/servicios/dto/trabajador.response-dto";
import {EstadoSolicitudPrestamo} from "../../../../enums/estado-solicitud-prestamo";

export interface PrestamoResponseDto extends AbstractResponseDto {
  // nombre?: string;

  tipoPrestamo?: string;
  fechaPrestamo?: string;
  comprobanteEgreso?: string;
  valor?: number;
  cuotas?: number;
  tasaInteres?: number;
  concepto?: string;
  estado?: string;
  modalidadDescuento?: string;
  totalPagado?: number;
  totalSaldo?: number;
  abonoPrestamoCollection?: AbonoPrestamoResponseDto[];
  idTrabajador?: TrabajadorResponseDto;
  estadoSolicitud?: EstadoSolicitudPrestamo;
  idAux?: string;
  nombreApellidoResponsable?: string;
}
