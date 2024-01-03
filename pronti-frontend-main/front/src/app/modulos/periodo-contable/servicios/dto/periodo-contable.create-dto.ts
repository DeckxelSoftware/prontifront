import {ActivoInactivo} from '../../../../enums/activo-inactivo';

export interface PeriodoContableCreateDto {

  // nombre: string;
  fechaInicio: string;
  fechaFin: string;
  anio: number;
  esPeriodoActual: ActivoInactivo;

}
