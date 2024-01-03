import {CodigoAuxiliarRubrosRolEnum} from '../../../../enums/codigo-auxiliar-rubros-rol.enum';
import {RubrosRolResponseDto} from '../../../rubros-rol/servicios/dto/rubros-rol.response-dto';
import {TrabajadorResponseDto} from '../../../trabajador/servicios/dto/trabajador.response-dto';
import {PeriodoLaboralResponseDto} from '../../../periodo-laboral/servicios/dto/periodo-laboral.response-dto';

export interface DetalleNovedadRolPagoUpdateDto {
  // nombre?: string;
  codigoNovedad?: CodigoAuxiliarRubrosRolEnum;
  tipoNovedad?: string;
  valor?: number;
  concepto?: string;
  idRubrosRol?: RubrosRolResponseDto;
  idTrabajador?: TrabajadorResponseDto;
  periodoLaboral?: PeriodoLaboralResponseDto;
}
