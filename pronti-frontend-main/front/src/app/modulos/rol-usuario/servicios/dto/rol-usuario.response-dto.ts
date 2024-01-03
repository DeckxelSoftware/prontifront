import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";

export interface RolUsuarioResponseDto extends AbstractResponseDto {
  idRol?: {
    nombre: string,
    sisHabilitado: 1 | 0,
  }
  // nombre?: string;
}
