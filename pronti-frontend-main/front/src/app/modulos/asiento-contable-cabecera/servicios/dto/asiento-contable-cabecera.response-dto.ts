import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {ChequeResponseDto} from '../../../cheque/servicios/dto/cheque.response-dto';
import {CuentaContableResponseDto} from '../../../cuenta-contable/servicios/dto/cuenta-contable.response-dto';
import { TransaccionAsientoContableResponseDto } from '../../../transaccion-asiento-contable/servicios/dto/transaccion-asiento-contable.response-dto';

export interface AsientoContableCabeceraResponseDto extends AbstractResponseDto {
  // nombre?: string;

  fecha?: string | Date;
  anio?: number;
  mesPeriodo?: string;
  tipoTransaccion?: string;
  tipoAsientoContable?: string;
  codigoReferencialAsientoContable?: string;
  totalDebito?: number;
  totalCredito?: number;
  totalSaldoActualFecha?: number;
  asientoCerrado?: string;
  idCheque?: ChequeResponseDto;
  serie?: string;
  beneficiario?: string;
  descripcion?: string;
  diferencia?: number;
  transaccionAsientoContableCollection?: TransaccionAsientoContableResponseDto[];
}
