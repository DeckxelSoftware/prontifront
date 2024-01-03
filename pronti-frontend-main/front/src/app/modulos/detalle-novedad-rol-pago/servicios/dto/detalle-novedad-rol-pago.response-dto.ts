import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {CodigoAuxiliarRubrosRolEnum} from '../../../../enums/codigo-auxiliar-rubros-rol.enum';
import {TrabajadorResponseDto} from '../../../trabajador/servicios/dto/trabajador.response-dto';
import {PeriodoLaboralResponseDto} from '../../../periodo-laboral/servicios/dto/periodo-laboral.response-dto';
import {RubrosRolResponseDto} from '../../../rubros-rol/servicios/dto/rubros-rol.response-dto';

export interface DetalleNovedadRolPagoResponseDto extends AbstractResponseDto {
  // nombre?: string;
    codigoNovedad?: CodigoAuxiliarRubrosRolEnum;
    tipoNovedad?: string;
    valor?: number;
    concepto?: string;
    idRubrosRol?: RubrosRolResponseDto;
    idTrabajador?: TrabajadorResponseDto;
    periodoLaboral?: PeriodoLaboralResponseDto;
}
