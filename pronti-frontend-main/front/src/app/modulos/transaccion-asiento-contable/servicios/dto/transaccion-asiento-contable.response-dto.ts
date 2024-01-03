import { AbstractResponseDto } from "../../../../abstract/dto/abstract-response.dto";
import {AsientoContableCabeceraResponseDto} from '../../../asiento-contable-cabecera/servicios/dto/asiento-contable-cabecera.response-dto';
import {CuentaContableResponseDto} from '../../../cuenta-contable/servicios/dto/cuenta-contable.response-dto';

export interface TransaccionAsientoContableResponseDto extends AbstractResponseDto {
  // nombre?: string;
  detalle?: string;
  valorDebito?: number;
  valorCredito?: number;
  numeroFactura?: string;
  idAsientoContableCabecera?: AsientoContableCabeceraResponseDto;
  idCuentaContable?: CuentaContableResponseDto;
}
