import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface GrupoFindDto extends AbstractFindDto {
  nombreGrupo?: string;
  idClienteId?: number;
}
