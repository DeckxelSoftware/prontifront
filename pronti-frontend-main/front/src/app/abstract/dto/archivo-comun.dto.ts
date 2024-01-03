import {TipoArchivo} from '../../modulos/archivo/constantes/tipo-archivo';
import {TipoDocumento} from '../../modulos/archivo/constantes/tipo-documento';

export interface ArchivoComunDto {
  tipoArchivo: TipoArchivo;
  tipoDocumento: TipoDocumento;
  nombreTabla: string;
  idTabla: string;
  nombreOriginal: string;
  buffer: string;
}
