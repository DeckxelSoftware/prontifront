import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {ActivoInactivo} from '../../../../enums/activo-inactivo';

export interface PeriodoContableResponseDto extends AbstractResponseDto {
  // nombre?: string;
  fechaInicio?: string;
  fechaFin?: string;
  anio?: number;
  esPeriodoActual?: ActivoInactivo;
}
