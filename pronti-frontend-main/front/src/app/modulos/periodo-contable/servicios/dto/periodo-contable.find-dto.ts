import { AbstractFindDto } from "../../../../abstract/dto/abstract-find.dto";

export interface PeriodoContableFindDto extends AbstractFindDto {
    esPeriodoActual?: string;
}
