import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";

export interface CargoVacacionResponseDto extends AbstractResponseDto {
  // nombre?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  diasVacaciones?: number;
  diasAntiguedad?: number;
  diasTeoricos?: number;
  diasTomados?: number;
  diasSaldo?: number;
  valorVacacion?: number;
  valorDias?: number;
  valorAntiguedad?: number;
  valorTeorico?: number;
  valorTomado?: number;
  valorSaldo?: number;
  totalIngresosAnio?: number;
  numAnioAcumulado?: number;
  idTrabajador?: any;
}
