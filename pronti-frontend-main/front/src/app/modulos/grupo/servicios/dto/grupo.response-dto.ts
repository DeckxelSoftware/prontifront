import { AbstractResponseDto } from "../../../../abstract/dto/abstract-response.dto";

export interface GrupoResponseDto extends AbstractResponseDto {
  // nombre?: string;
  nombreGrupo?: string;
  sumatoriaMontoMeta?: number;
  totalContratosUsados?: number;
  totalContratosPermitidos?: number;
  clienteEnGrupoCollection?: any[];
  fondoAcumuldo?: number;
}
