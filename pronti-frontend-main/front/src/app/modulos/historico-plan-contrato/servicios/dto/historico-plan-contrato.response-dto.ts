import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {ContratoResponseDto} from '../../../contrato/servicios/dto/contrato.response-dto';
import {PlanResponseDto} from '../../../plan/servicios/dto/plan.response-dto';
import {SiNoEnum} from "../../../../enums/si-no.enum";

export interface HistoricoPlanContratoResponseDto extends AbstractResponseDto {
  totalInscripcionPlan?: number;
  valorDsctoInscripcion?: number;
  totalCobroInscripcion?: number;
  capitalTotal?: number;
  capitalPorRefinanciamiento?: number;
  abonosCapitalActual?: number;
  saldoCapital?: number;
  valorTasaAdministrativa?: number;
  totalTasaAdministrativaCobrada?: number;
  totalCuotasCobradas?: number;
  totalCuotasMoraActual?: number;
  totalCuotasMora?: number;
  totalMontoCobrado?: number;
  valorDsctoPrimeraCuota?: number;
  totalCobroPrimeraCuota?: number;
  valorRecargo?: number;
  idContrato?: ContratoResponseDto;
  idPlan?: PlanResponseDto;
  cuotaCollection?: any[]; // actualizar cuando se tenga cuotasResponseDTo
  inscripcionEstaPagada?: SiNoEnum;
  valorPagadoInscripcion?: number;
  totalDispositivoCobrado?: number;
  cargosAdjudicacion?: number;
}
