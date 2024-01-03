import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {RolUsuarioResponseDto} from '../../../rol-usuario/servicios/dto/rol-usuario.response-dto';

export interface UsuarioResponseDto extends AbstractResponseDto {
  // nombre?: string;
  username?: string;
  correo?: string;
  password?: string;
  nombres?: string;
  apellidos?: string;
  fechaNacimiento?: string;
  rolUsuarioCollection?: RolUsuarioResponseDto[];
  tipoMedioContacto1?: string;
  medioContacto1?: string;
  tipoDocumentoIdentidad?: string;
  documentoIdentidad?: string;
  pais?: string;
  provincia?: string;
  ciudad?: string;
  nombresCompletos?: string;
}
