import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";
import {EstadoContratoEnum} from "../../../../enums/estado-contrato.enum";

export interface ContratoFindDto extends AbstractFindDto {
  numeroDeContrato?: string;
  fechaInicio?: string;
  fechaFin?: string;
  estado?: EstadoContratoEnum;
}
