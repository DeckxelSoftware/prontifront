import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface SupervisorFindDto extends AbstractFindDto {
  busqueda?: string;
  idAgencia?: number;
  idTrabajadorModalidadContrato?: string;
}
