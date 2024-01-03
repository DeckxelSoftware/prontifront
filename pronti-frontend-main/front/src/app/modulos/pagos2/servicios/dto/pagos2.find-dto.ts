import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface Pagos2FindDto extends AbstractFindDto {
  idPeriodoLaboral?: number;
  trabajadorDesde?: string;
  trabajadorHasta?: string;
}
