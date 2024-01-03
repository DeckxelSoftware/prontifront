import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {SiNoEnum} from '../../../../enums/si-no.enum';
import {CodigoAuxiliarRubrosRolEnum} from '../../../../enums/codigo-auxiliar-rubros-rol.enum';
import {UnidadesEnum} from '../../../../enums/unidades.enum';

export interface RubrosRolResponseDto extends AbstractResponseDto {
  codigoAuxiliar?: CodigoAuxiliarRubrosRolEnum;
  nombre?: string;
  nombreAuxiliarUno?: string;
  nombreAuxiliarDos?: string;
  unidad?: UnidadesEnum;
  calculaIess?: SiNoEnum;
  calculaRenta?: SiNoEnum;
  calculaDecTercero?: SiNoEnum;
  calculaDecCuarto?: SiNoEnum;
  calculaFReserva?: SiNoEnum;
  calculaVacaciones?: SiNoEnum;
  seSuma?: SiNoEnum;

}
