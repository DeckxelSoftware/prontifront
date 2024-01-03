import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";

export interface PlanResponseDto extends AbstractResponseDto {
  // nombre?: string;
  precio?: number;
  // plazoMesMinimo?: number;
  // plazoMesMaximo?: number;
  modelo?: string;
  // marca?: string;
  inscripcion?: number;
  // tasaAdministrativa?: number;
  cuotaMes12?: number;
  cuotaMes24?: number;
  cuotaMes36?: number;
  cuotaMes48?: number;
  cuotaMes60?: number;
  cuotaMes72?: number;
  cuotaMes84?: number;
}
