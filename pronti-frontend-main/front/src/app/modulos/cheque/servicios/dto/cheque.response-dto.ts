import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {EstadoChequeEnum} from '../../../../enums/estado-cheque.enum';
import {ChequeraResponseDto} from '../../../chequera/servicios/dto/chequera.response-dto';

export interface ChequeResponseDto extends AbstractResponseDto {
  // nombre?: string;
  numeroCheque?: number;
  estadoCheque?: EstadoChequeEnum;
  idChequera?: ChequeraResponseDto;
}
