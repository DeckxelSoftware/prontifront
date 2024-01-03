import { AbstractFindDto } from "../../../../abstract/dto/abstract-find.dto";

export interface AsientoContableDetAdicionalFindDto extends AbstractFindDto {
  llave: string;
  idAsientoContableCabecera: number;
}
