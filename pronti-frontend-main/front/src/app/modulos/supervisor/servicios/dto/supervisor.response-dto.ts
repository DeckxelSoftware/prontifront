import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {TrabajadorResponseDto} from '../../../trabajador/servicios/dto/trabajador.response-dto';
import {AgenciaResponseDto} from '../../../agencia/servicios/dto/agencia.response-dto';

export interface SupervisorResponseDto extends AbstractResponseDto {
  // nombre?: string;
  idTrabajador?: TrabajadorResponseDto;
  idAgencia?:AgenciaResponseDto;
}
