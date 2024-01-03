import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";

export interface Pagos1ResponseDto extends AbstractResponseDto {
  // nombre?: string;
  region?: string;
  fechaInicio?: string;
  fechaFin?: string;
  ultimoPago?: string;
  nombre?: string;
  periodo?: string;
  fechaUltimoPago?: string;
}
