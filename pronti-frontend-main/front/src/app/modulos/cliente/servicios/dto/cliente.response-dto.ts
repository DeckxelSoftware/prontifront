import { AbstractResponseDto } from "../../../../abstract/dto/abstract-response.dto";
import {UsuarioResponseDto} from '../../../usuario/servicios/dto/usuario.response-dto';
import {EmpresaResponseDto} from '../../../empresa/servicios/dto/empresa.response-dto';

export interface ClienteResponseDto extends AbstractResponseDto {
  // nombre?: string;
  idUsuario?: UsuarioResponseDto | any;
  idEmpresa?: EmpresaResponseDto | any;
  tipoCliente?: string;
  collectionClienteEnGrupo?: any[];
}
