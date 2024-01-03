import {EmpresaCreateDto} from '../../../empresa/servicios/dto/empresa.create-dto';
import {UsuarioCreateDto} from '../../../usuario/servicios/dto/usuario.create-dto';
import {TipoProveedorEnum} from '../../../../enums/tipo-proveedor.enum';
import {SiNoEnum} from '../../../../enums/si-no.enum';
import {EmpresaUpdateDto} from '../../../empresa/servicios/dto/empresa.update-dto';
import {UsuarioUpdateDto} from '../../../usuario/servicios/dto/usuario.update-dto';

export interface ProveedorUpdateDto {
  id: number;
  idEmpresa?: EmpresaUpdateDto | number;
  idUsuario?: UsuarioUpdateDto | number;
  tipoProveedor?: TipoProveedorEnum;
  nombrePersonaReferencia?: string;
  contactoReferencia?: string;
  tipoCuentaContable?: string;
  claseContribuyente?: string;
  obligadoLlevarContabilidad?: SiNoEnum;
  agenteRetencion?: SiNoEnum;
}
