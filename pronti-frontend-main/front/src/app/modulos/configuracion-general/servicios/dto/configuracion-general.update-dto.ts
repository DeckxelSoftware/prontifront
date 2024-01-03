import {AsumeIvaEnum} from "../../../../enums/asume-iva.enum";

export interface ConfiguracionGeneralUpdateDto {

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
  asumeIva?: AsumeIvaEnum;
  elaboradorRol?: string;
  revisorRol?:string;

}
