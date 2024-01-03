import {CodigoAuxiliarRubrosRolEnum} from '../../../../enums/codigo-auxiliar-rubros-rol.enum';

export interface DetalleNovedadRolPagoCreateDto {

  // nombre: string;
  codigoNovedad: CodigoAuxiliarRubrosRolEnum;
  tipoNovedad: string;
  valor: number;
  concepto: string;
  idRubrosRol: number;
  idTrabajador: number;
  periodoLaboral: number; // creo que no debo mandar esto
}
