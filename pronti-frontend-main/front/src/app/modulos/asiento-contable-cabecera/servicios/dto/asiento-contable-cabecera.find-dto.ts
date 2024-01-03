import { AbstractFindDto } from "../../../../abstract/dto/abstract-find.dto";

export interface AsientoContableCabeceraFindDto extends AbstractFindDto {
  tipoTransaccion?: string;
  tipoAsientoContable?: string;
  asientoCerrado?: string;
  idSubgrupoContable?: number;
}
