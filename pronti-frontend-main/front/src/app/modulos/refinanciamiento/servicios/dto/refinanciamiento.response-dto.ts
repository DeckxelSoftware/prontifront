import { AbstractResponseDto } from "../../../../abstract/dto/abstract-response.dto";

export interface RefinanciamientoResponseDto extends AbstractResponseDto {
  // nombre?: string;
  totalCuotas?:number;
  totalCuotasPagadas?:number;
  totalCuotasMora?:number;
  totalCuotasPagadasRefinanciamiento?:number;
  totalCuotasFaltantesRefinanciamiento?:number;
  cuotasRestantesSinMora?:number;
  valorCuota?:number;
  valorPendientePago?:number;
  valorAgregarseCuota?:number;
  fechaRefinanciamiento?:string;
}
