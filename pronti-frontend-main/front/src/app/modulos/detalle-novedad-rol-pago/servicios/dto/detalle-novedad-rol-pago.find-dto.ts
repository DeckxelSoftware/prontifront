import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";
import {CodigoAuxiliarRubrosRolEnum} from '../../../../enums/codigo-auxiliar-rubros-rol.enum';

export interface DetalleNovedadRolPagoFindDto extends AbstractFindDto {
  codigoNovedad?: CodigoAuxiliarRubrosRolEnum;
  idTrabajador?: number;
  idAgencia?: number;
}
