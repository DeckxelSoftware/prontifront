import { AbstractFindDto } from "../../../../abstract/dto/abstract-find.dto";

export interface ArticuloFindDto extends AbstractFindDto {
  estado?: string;
}
