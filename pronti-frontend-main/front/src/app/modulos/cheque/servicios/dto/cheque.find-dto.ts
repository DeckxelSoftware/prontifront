import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";
import {EstadoChequeEnum} from '../../../../enums/estado-cheque.enum';

export interface ChequeFindDto extends AbstractFindDto {
  estadoCheque?: EstadoChequeEnum;
}
