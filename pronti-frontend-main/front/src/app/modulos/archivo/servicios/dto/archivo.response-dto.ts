import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {TipoArchivo} from '../../constantes/tipo-archivo';
import {TipoDocumento} from '../../constantes/tipo-documento';

export interface ArchivoResponseDto extends AbstractResponseDto {
  buffer?: string;
  tipoArchivo?: TipoArchivo;
  nombreTabla?: string;
  idTabla?: string;
  tipoDocumento?: TipoDocumento;
  nombreOriginal?: string;
}
