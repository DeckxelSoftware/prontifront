import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";
import {EstadoPrestamoEnum} from "../../../../enums/estado-prestamo.enum";

export interface PrestamoFindDto extends AbstractFindDto {
  tipoPrestamo?: string;
  estadoSolicitud?: string;
  fechaInicio?: string;
  fechaFin?: string;
  estado?: EstadoPrestamoEnum;
}
