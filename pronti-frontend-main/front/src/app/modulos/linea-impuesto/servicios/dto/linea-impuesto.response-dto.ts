import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {CuentaContableResponseDto} from "../../../cuenta-contable/servicios/dto/cuenta-contable.response-dto";

export interface LineaImpuestoResponseDto extends AbstractResponseDto {
  nombre?: string;
  porcentaje?: number;
  idCuentaContable?: CuentaContableResponseDto;
  codigo?: number;
}
