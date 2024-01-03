import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {LineaImpuestoResponseDto} from "../../../linea-impuesto/servicios/dto/linea-impuesto.response-dto";

export interface RecursoResponseDto extends AbstractResponseDto {
  nombre?: string;
  lineaImpuestoCollection?: LineaImpuestoResponseDto[];
}
