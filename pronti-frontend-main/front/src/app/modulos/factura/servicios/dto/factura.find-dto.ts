import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface FacturaFindDto extends AbstractFindDto {
  desde?: string;
  hasta?: string;
  itNumeroDocumento?: string;
}
