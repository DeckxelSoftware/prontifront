import {AbstractFindDto} from '../../../../abstract/dto/abstract-find.dto';

export interface ListaValoresDetalleFindDto extends AbstractFindDto {
  idListaValoresTipo?: string;
  listaValoresTipo?: string;
  codigoPrimario?: string;
  idListaValoresTipoCodigoPrimario?: string;
}
