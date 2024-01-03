import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {PagoInterface} from "../../../cuota/rutas/ruta-cuota-cobro/ruta-cuota-cobro.component";
import {ContratoResponseDto} from "../../../contrato/servicios/dto/contrato.response-dto";

export interface CobroResponseDto extends AbstractResponseDto {
  // nombre?: string;
  valorACobrar?: number;
  pagoCollection?: PagoInterface[];
  idContrato?: ContratoResponseDto;
}
