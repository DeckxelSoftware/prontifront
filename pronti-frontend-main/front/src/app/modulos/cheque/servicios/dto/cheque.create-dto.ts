import {EstadoChequeEnum} from '../../../../enums/estado-cheque.enum';

export interface ChequeCreateDto {

  // nombre: string;
  numeroCheque: number;
  estadoCheque: EstadoChequeEnum;
  idChequera: number;
}
