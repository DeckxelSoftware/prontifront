import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface NotaCreditoFindDto extends AbstractFindDto {
  inFechaEmision?: string;
  numDocModificado?: string;
  desde?: string;
  hasta?: string;
}
