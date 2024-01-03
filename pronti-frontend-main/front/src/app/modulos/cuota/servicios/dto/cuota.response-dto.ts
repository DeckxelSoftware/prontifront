import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {SiNoEnum} from '../../../../enums/si-no.enum';

export interface CuotaResponseDto extends AbstractResponseDto {
  // nombre?: string;
  fechaCobro?: string;
  fechaMora?: string;
  numeroCuota?: number;
  valorCuota?: number;
  valorPagadoCuota?: number;
  valorTasaAdministrativa?: number;
  valorImpuesto?: number;
  abonoCapital?: number;
  estaPagado?: SiNoEnum;
  estaMora?: SiNoEnum;
  // Campos para tabla view
  pasaANuevoPlan?: string;
  dispositivo?: number;
  rastreo?: number;
  dispositivoEstaPagado?: SiNoEnum;
  rastreoEstaPagado?: SiNoEnum;
  valorPorCobrar?: number;
  valorTotalDispositivoCobrado?: number;
  valorTotalRastreoCobrado?: number;

}
