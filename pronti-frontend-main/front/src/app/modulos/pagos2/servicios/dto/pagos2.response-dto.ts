import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {TrabajadorResponseDto} from "../../../trabajador/servicios/dto/trabajador.response-dto";
import { PeriodoLaboralResponseDto } from '../../../periodo-laboral/servicios/dto/periodo-laboral.response-dto';

export interface Pagos2ResponseDto extends AbstractResponseDto {
  // nombre?: string;

  idTrabajador?: TrabajadorResponseDto;
  diasLaboradosAlAnio?: number;
  valorReal?: number;
  valorNominal?: number;
  otrosIngresos?: number;
  totalIngresos?:number;
  otrosDescuentos?: number;
  multas?: number;
  totalEgresos?: number;
  valorAPagar?: number;
  fechaInicio?: string;
  fechaFin?: string;
  anioPago?: number;
  valorMes1?: number;
  valorMes2?: number;
  valorMes3?: number;
  valorMes4?: number;
  valorMes5?: number;
  valorMes6?: number;
  valorMes7?: number;
  valorMes8?: number;
  valorMes9?: number;
  valorMes10?: number;
  valorMes11?: number;
  valorMes12?: number;
  prestamosEmpresa?: number;
  anticipos?: number;
  idPeriodoLaboral?: PeriodoLaboralResponseDto,

}
