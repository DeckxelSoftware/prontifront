import { AbstractFindDto } from "../../../../abstract/dto/abstract-find.dto";

export interface Pagos1FindDto extends AbstractFindDto {
    nombre?: string;
    fechaFin?: string;
}
