import { AbstractFindDto } from "../../../../abstract/dto/abstract-find.dto";

export interface PlanCuentasFindDto extends AbstractFindDto {
  idNivel1? : number | string;
  idNivel2?: number | string;
  idNivel3?: number | string;
  idNivel4?: number | string;
  nivel?: number

}
