import {AbstractFindDto} from '../../../../abstract/dto/abstract-find.dto';

export interface LibroBibliotecaFindDto extends AbstractFindDto {
  generoLibro?: string;
}
