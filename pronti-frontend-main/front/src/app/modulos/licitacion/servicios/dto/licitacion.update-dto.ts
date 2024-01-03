import {EstadoLicitacionEnum} from '../../../../enums/estado-licitacion.enum';
import {SiNoEnum} from '../../../../enums/si-no.enum';

export interface LicitacionUpdateDto {

  valorOferta?: number;
  // porcentajeOferta?: number;
  fechaOferta?: string;
  observacion?: string;
  estado?: EstadoLicitacionEnum,
  planSeleccionado?: string;
  precioPlan?: number;
  totalMontoCobrado?: number;
  aprobadoPorGerencia?: SiNoEnum;
}
