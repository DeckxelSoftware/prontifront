export interface HistorialLaboralCreateDto {

  // nombre: string;
  cargo: string;
  tipoContrato: string;
  sueldo: number;
  fechaIngreso: string;
  fechaFin: string;
  duracion: string;
  fueAscendido: string;
  codigoSectorial?: string;
  idDivisionAdministrativa?: number;
  idAgencia?: number;
  idCargo?: number;

}
