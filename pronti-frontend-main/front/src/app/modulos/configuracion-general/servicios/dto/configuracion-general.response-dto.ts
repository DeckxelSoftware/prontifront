import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";

export interface ConfiguracionGeneralResponseDto extends AbstractResponseDto {
  // nombre?: string;
  ivaPorcentaje?: number;
  tasaCambioContrato?: number;
  minCuotaMoraRefinanciamiento?: number;
  maxContratosEnGrupo?: number;
  cuotaAdministrativa?: number;
  aportePatronalIess?: number;
  aportePersonalIess?: number;
  numDiasVacacionesAlAnio?: number;
  sueldoBasico?: number;
  tasaCargoAdjudicacion?: number;
  rastreo?: number;
  dispositivo?: number;
  elaboradorRol?: string;
  revisorRol?:string;

}
