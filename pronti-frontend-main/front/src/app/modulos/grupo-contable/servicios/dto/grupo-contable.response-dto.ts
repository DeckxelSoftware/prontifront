import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";

export interface GrupoContableResponseDto extends AbstractResponseDto {
  nombre?: string;
  descripcion?: string;
}
