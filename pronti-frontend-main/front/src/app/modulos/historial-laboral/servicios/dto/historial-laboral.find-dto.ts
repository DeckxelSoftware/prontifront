import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface HistorialLaboralFindDto extends AbstractFindDto {
  idTrabajador?: number;
  idCargo?: string;
  tipoContrato?: string;
  fechaIngreso?: string;
}
