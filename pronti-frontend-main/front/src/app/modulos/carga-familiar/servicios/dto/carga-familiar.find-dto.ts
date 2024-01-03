import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";
import {SiNoEnum} from '../../../../enums/si-no.enum';

export interface CargaFamiliarFindDto extends AbstractFindDto {
  idTrabajador?: number;
  discapacidad?: SiNoEnum;
  estudia?: SiNoEnum;
}
