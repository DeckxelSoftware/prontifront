import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface MemorandumFindDto extends AbstractFindDto {
  idTrabajador: number;
}
