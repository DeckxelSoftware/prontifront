import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface ArchivoFindDto extends AbstractFindDto {
  idTabla?: string;
  nombreTabla?: string;
}
