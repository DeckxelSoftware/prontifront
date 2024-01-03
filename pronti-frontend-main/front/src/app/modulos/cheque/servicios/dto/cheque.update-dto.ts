import {EstadoChequeEnum} from '../../../../enums/estado-cheque.enum';

export interface ChequeUpdateDto {

  // nombre?: string;
  numeroCheque?: number;
  estadoCheque?: EstadoChequeEnum;
  idChequera?: number;

}
