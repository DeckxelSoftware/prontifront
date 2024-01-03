import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";


export interface AutorLibroFindDto extends AbstractFindDto {
  nombres?: string;
  apellidos?: string;
  idLibroBiblioteca?: number;
}
