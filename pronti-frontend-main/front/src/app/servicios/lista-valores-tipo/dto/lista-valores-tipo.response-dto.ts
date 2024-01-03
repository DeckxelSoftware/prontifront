import {AbstractResponseDto} from '../../../abstract/dto/abstract-response.dto';

export class ListaValoresTipoResponseDto extends AbstractResponseDto {
  codigoPrimario?: string;
  codigoSecundario?: string;
  nombre?: string;
  descripcion?: string;
  listaValorDetalleCollection?: any[];

}
