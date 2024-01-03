import { AbstractFindDto } from "../../../../abstract/dto/abstract-find.dto";

export interface PeriodoLaboralFindDto extends AbstractFindDto {
  activo?: string;
  anio?: string;
}
