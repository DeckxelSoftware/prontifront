import {EmpresaCreateDto} from '../../../empresa/servicios/dto/empresa.create-dto';
import {UsuarioCreateDto} from '../../../usuario/servicios/dto/usuario.create-dto';
import {TipoProveedorEnum} from '../../../../enums/tipo-proveedor.enum';
import {SiNoEnum} from '../../../../enums/si-no.enum';

export interface ProveedorCreateDto {
  idEmpresa?: EmpresaCreateDto | number;
  idUsuario?: UsuarioCreateDto | number;
  tipoProveedor?: TipoProveedorEnum;
  nombrePersonaReferencia?: string;
  contactoReferencia?: string;
  tipoCuentaContable?: string;
  claseContribuyente?: string;
  obligadoLLevarContabilidad?: SiNoEnum;
  agenteRetencion?: SiNoEnum;

}
