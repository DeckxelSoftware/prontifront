import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {
  DetalleNovedadRolPagoResponseDto
} from "../../../detalle-novedad-rol-pago/servicios/dto/detalle-novedad-rol-pago.response-dto";

import { RolPagoResponseDto } from '../../../rol-pago/servicios/dto/rol-pago.response-dto';
export interface PeriodoLaboralResponseDto extends AbstractResponseDto {
  // nombre?: string;
  anio?: number;
  mes?: string;
  fechaInicio?: string;
  fechaFin?: string;
  activo?: string;
  detalleNovedadRolPagoCollection?: DetalleNovedadRolPagoResponseDto[];
  rolPagoCollection?: RolPagoResponseDto[];
}
