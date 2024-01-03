import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface SriGastosFindDto extends AbstractFindDto {
  anio?: number;
  idTrabajador?: number;
}
