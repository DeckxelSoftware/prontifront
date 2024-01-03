import { AbstractResponseDto } from "../../../../abstract/dto/abstract-response.dto";
import {ClienteResponseDto} from '../../../cliente/servicios/dto/cliente.response-dto';
import {GrupoResponseDto} from '../../../grupo/servicios/dto/grupo.response-dto';

export interface ClienteEnGrupoResponseDto extends AbstractResponseDto {
  // nombre?: string;
  idCliente?: ClienteResponseDto;
  idGrupo?: GrupoResponseDto;
}
