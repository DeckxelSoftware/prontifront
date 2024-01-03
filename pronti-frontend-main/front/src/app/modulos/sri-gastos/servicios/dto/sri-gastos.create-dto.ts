import {TrabajadorResponseDto} from "../../../trabajador/servicios/dto/trabajador.response-dto";

export interface SriGastosCreateDto {

  // nombre: string;
  anio?: number;
  gastoVivienda?: number;
  gastoEducacion?: number;
  gastoSalud?: number;
  gastoVestido?: number;
  gastoAlimento?: number;
  gastoTurismo?: number;
  gastoDiscapacidad?: number;
  gastoTerceraEdad?: number;
  totalGastos?: number;
  idTrabajador: number;
}
