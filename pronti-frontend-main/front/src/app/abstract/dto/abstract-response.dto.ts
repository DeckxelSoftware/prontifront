import {ActivoInactivo} from '../../enums/activo-inactivo';
import {ArchivoComunDto} from './archivo-comun.dto';

export class AbstractResponseDto {
  id?: number;
  sisHabilitado?: ActivoInactivo;
  sisModificado?: string;
  sisCreado?: string;
  sisImagen?: ArchivoComunDto;
  sisArchivo?: ArchivoComunDto;
}
