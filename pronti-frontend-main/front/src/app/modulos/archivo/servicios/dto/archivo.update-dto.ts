import {TipoArchivo} from '../../constantes/tipo-archivo';
import {TipoDocumento} from '../../constantes/tipo-documento';

export interface ArchivoUpdateDto {
  // nombre?: string;
  idTabla: string,
  file: File;
  nombreTabla: string;
  tipoArchivo: TipoArchivo;
  tipoDocumento: TipoDocumento;
  sisHabilitado: string
}
