import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";

export interface FiniquitoResponseDto extends AbstractResponseDto {
  // nombre?: string;
  fechaSalida?: string;
  motivoSalida?: string;
  totalIngresos?: number;
  valorVacaciones?: number;
  decimoTercero?: number;
  decimoCuarto?: number;
  aportePersonalIess?: number;
  desahucio?: number;
  despidoIntenpestivo?: number;
  pagoFondoReservaMes?: number;
  provIess?: number;
  totalDescuentos?: number;
  credencial?: number;
  descuentoCliente?: number;
  stand?: number;
  chompa?: number;
  clientesDesistidos?: number;
  valorAPagar?: number;
  responsable?: number;
  revisor?: number;
  aprobador?: number;
}
