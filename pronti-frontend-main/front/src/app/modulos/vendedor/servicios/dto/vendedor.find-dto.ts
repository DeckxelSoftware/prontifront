import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface VendedorFindDto extends AbstractFindDto {
  busqueda?: string;
  idAgencia?: number;
  idTrabajadorModalidadContrato?: string;
}
