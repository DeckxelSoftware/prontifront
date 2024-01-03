import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {TipoProveedorEnum} from '../../../../enums/tipo-proveedor.enum';
import {EmpresaResponseDto} from '../../../empresa/servicios/dto/empresa.response-dto';
import {UsuarioResponseDto} from '../../../usuario/servicios/dto/usuario.response-dto';
import {SiNoEnum} from '../../../../enums/si-no.enum';

export interface ProveedorResponseDto extends AbstractResponseDto {
  // nombre?: string;
  claseContribuyente?: string;
  obligadoLlevarContabilidad?: SiNoEnum;
  agenteRetencion?: SiNoEnum;
  tipoProveedor?: TipoProveedorEnum;
  nombrePersonaReferencia?: string;
  contactoReferencia?: string;
  tipoCuentaContable?: string;
  idEmpresa?: EmpresaResponseDto;
  idUsuario?: UsuarioResponseDto;
  nombreMostrar?: string;

}
