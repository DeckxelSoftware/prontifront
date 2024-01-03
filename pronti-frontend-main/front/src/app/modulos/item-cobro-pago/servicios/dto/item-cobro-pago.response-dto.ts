import { AbstractResponseDto } from "../../../../abstract/dto/abstract-response.dto";
import {CuentaContableResponseDto} from '../../../cuenta-contable/servicios/dto/cuenta-contable.response-dto';

export interface ItemCobroPagoResponseDto extends AbstractResponseDto {
  // nombre?: string;
  nombreItem?: string;
  nombreCuenta?: string;
  idCuentaContable?: number | CuentaContableResponseDto;
}
