import {TrabajadorResponseDto} from '../../../trabajador/servicios/dto/trabajador.response-dto';
import {AgenciaResponseDto} from '../../../agencia/servicios/dto/agencia.response-dto';
import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import { ProveedorResponseDto } from '../../../proveedor/servicios/dto/proveedor.response-dto';

export interface VendedorResponseDto extends AbstractResponseDto {
  // nombre?: string;
  idTrabajador?: TrabajadorResponseDto;
  idProveedor?: ProveedorResponseDto;
  idAgencia?:AgenciaResponseDto;
}
