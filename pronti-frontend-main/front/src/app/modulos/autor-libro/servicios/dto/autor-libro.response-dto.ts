import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";

export interface AutorLibroResponseDto extends AbstractResponseDto {
  nombres?: string;
  apellidos?: string;
  biografia?: string;
  idLibroBiblioteca?: any;
}

