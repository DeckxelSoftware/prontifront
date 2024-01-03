import {EstadoLicitacionEnum} from '../../../../enums/estado-licitacion.enum';
import {SiNoEnum} from '../../../../enums/si-no.enum';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';

export interface LicitacionCreateDto {

  // nombre: string;
  idContrato: number;
  valorOferta: number;
  porcentajeOferta: number;
  fechaOferta: string;
  observacion: string;
  estado: EstadoLicitacionEnum,
  planSeleccionado: string;
  precioPlan: number;
  totalMontoCobrado: number;
  aprobadoPorGerencia: SiNoEnum;
  sisHabilitado?: ActivoInactivo;
}
