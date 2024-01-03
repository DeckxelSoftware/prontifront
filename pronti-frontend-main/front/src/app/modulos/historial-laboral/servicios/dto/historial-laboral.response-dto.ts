import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {CargoResponseDto} from '../../../cargo/servicios/dto/cargo.response-dto';
import {TrabajadorResponseDto} from "../../../trabajador/servicios/dto/trabajador.response-dto";
import { CuentaContableResponseDto } from '../../../cuenta-contable/servicios/dto/cuenta-contable.response-dto';
import { RolPagoResponseDto } from '../../../rol-pago/servicios/dto/rol-pago.response-dto';

export interface HistorialLaboralResponseDto extends AbstractResponseDto {
  // nombre?: string;
  cargo?: string;
  tipoContrato?: string;
  sueldo?: number;
  fechaIngreso?: string;
  fechaFin?: string;
  duracion?: string;
  fueAscendido?: string;
  codigoSectorial?: string;
  idCargo?: CargoResponseDto;
  idTrabajador?: TrabajadorResponseDto;
  idCuentaContable?: CuentaContableResponseDto;
  rolPagoCollection?: RolPagoResponseDto[];
}
