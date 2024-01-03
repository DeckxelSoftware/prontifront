import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface ChequeraFindDto extends AbstractFindDto {
  fechaEmision?: string;
}
