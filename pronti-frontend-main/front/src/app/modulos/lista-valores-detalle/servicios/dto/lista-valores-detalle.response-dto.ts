import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {ListaValoresTipoResponseDto} from '../../../../servicios/lista-valores-tipo/dto/lista-valores-tipo.response-dto';

export interface ListaValoresDetalleResponseDto extends AbstractResponseDto {
  // nombre?: string;
  codigoPrimario?: string;
  codigoSecundario?: string;
  nombre?: string;
  descripcion?: string;
  idListaValoresTipo?: ListaValoresTipoResponseDto;
}
