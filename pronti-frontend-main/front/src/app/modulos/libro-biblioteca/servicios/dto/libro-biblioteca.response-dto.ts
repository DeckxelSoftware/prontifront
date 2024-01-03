import {AbstractResponseDto} from '../../../../abstract/dto/abstract-response.dto';

export interface LibroBibliotecaResponseDto extends AbstractResponseDto {
  generoLibro?: string;
  isbn?: string;
  nombre?: string;
  descripcion?: string;
}
