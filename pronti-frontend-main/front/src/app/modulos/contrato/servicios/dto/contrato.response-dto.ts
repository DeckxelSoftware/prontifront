import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {
  HistoricoPlanContratoResponseDto
} from '../../../historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto';
import {LicitacionResponseDto} from '../../../licitacion/servicios/dto/licitacion.response-dto';
import {EstadoContratoEnum} from "../../../../enums/estado-contrato.enum";
import {OrdenDeCompraResponseDto} from "../../../orden-de-compra/servicios/dto/orden-de-compra.response-dto";

export interface ContratoResponseDto extends AbstractResponseDto {
  // nombre?: string;
  documentoIdentidad?: string;
  numeroDeContrato?: string;
  fechaInicio?: string;
  fechaFin?: string;
  dsctoInscripcion?: number;
  dsctoPrimeraCuota?: number;
  observacion?: string;
  fechaIniciaCobro?: string;
  estado?: EstadoContratoEnum;
  plazoMesSeleccionado?: number;
  version?: number;
  idClienteEnGrupo?: any;
  historicoPlanContratoCollection?: HistoricoPlanContratoResponseDto[];
  dsctoRecargo?: number;
  precioPlanSeleccionado?: number;
  porcentajeInscripcion?: number;
  planSeleccionado?: string
  idVendedor?: any;
  nombresCliente?: string;
  apellidosCliente?: string;
  licitacionCollection?: LicitacionResponseDto[];
  cuotaActual?: number;
  cuotaACobrar?: number;
  idOrdenDeCompra?: OrdenDeCompraResponseDto;
  nombreGrupo?: string;
}
