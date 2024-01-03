import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";
import {SiNoEnum} from '../../../../enums/si-no.enum';

export interface BancoFindDto extends AbstractFindDto {
  nombre?: string;
}
