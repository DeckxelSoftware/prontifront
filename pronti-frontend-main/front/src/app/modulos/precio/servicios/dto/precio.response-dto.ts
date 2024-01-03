import { AbstractResponseDto } from "../../../../abstract/dto/abstract-response.dto";

export interface PrecioResponseDto extends AbstractResponseDto {
  // nombre?: string;
  precio?: number;
  inscripcion?: number;
  tasaAdministrativa?: number;
}
