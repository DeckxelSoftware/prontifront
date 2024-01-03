import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {EstadoLicitacionEnum} from '../../../../enums/estado-licitacion.enum';
import {SiNoEnum} from '../../../../enums/si-no.enum';
import {ContratoResponseDto} from '../../../contrato/servicios/dto/contrato.response-dto';
import {PreasambleaResponseDto} from "../../../preasamblea/servicios/dto/preasamblea.response-dto";

export interface LicitacionResponseDto extends AbstractResponseDto {
  valorOferta?: number;
  porcentajeOferta?: number;
  fechaOferta?: string;
  observacion?: string;
  estado?: EstadoLicitacionEnum,
  planSeleccionado?: string;
  precioPlan?: number;
  totalMontoCobrado?: number;
  aprobadoPorGerencia?: SiNoEnum;
  idContrato?: ContratoResponseDto;
  idPreasamblea?: PreasambleaResponseDto;
}
