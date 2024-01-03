import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface RolPagoFindDto extends AbstractFindDto {
  idPeriodoLaboral?: number;
  idAgencia?: number; // para informe de nomina
  idTrabajador?: number;
}
