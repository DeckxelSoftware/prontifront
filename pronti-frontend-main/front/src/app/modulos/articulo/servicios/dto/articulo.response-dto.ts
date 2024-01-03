import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";

export interface ArticuloResponseDto extends AbstractResponseDto {
  // nombre?: string;
  placa?: string;
  chasis?: string;
  marca?: string;
  modelo?: string;
  anio?: string;
  color?: string;
  observacion?: string;
  estado?: string;
  ubicacionFisica?: string;
  fechaAdjudicado?: string;
}
