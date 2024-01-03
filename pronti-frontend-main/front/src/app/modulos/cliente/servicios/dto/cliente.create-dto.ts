import {EmpresaCreateDto} from '../../../empresa/servicios/dto/empresa.create-dto';
import {UsuarioCreateDto} from '../../../usuario/servicios/dto/usuario.create-dto';

export interface ClienteCreateDto {

  // nombre: string;
  idEmpresa?: EmpresaCreateDto | number;

  idUsuario?: UsuarioCreateDto | number;

  tipoCliente?: string;

  sisHabilitado?: string;


}
