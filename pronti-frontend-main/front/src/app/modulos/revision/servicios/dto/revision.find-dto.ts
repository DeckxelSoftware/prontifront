import { AbstractFindDto } from "../../../../abstract/dto/abstract-find.dto";

export interface RevisionFindDto extends AbstractFindDto {
    idArticulo: number;
}
