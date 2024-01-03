import {ActivoInactivo} from '../../../../enums/activo-inactivo';

export interface PeriodoContableUpdateDto {

  // nombre?: string;
  fechaInicio?: string;
  fechaFin?: string;
  anio?: number;
  esPeriodoActual?: ActivoInactivo;
}
