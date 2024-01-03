import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import { LicitacionResponseDto } from '../../../licitacion/servicios/dto/licitacion.response-dto';

export interface PreasambleaResponseDto extends AbstractResponseDto {
  // nombre?: string;
  fechaPreasamblea?: string;
  fechaLimite?: string;
  observaciones?: string;
  estado?: 'APR' | 'NPR' | 'APG';
  licitacionCollection?: LicitacionResponseDto[];
}
