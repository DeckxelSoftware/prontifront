export interface ContratoCreateDto {

  // nombre: string;
  numeroDeContrato: string;
  fechaInicio: string;
  fechaFin: string;
  dsctoInscripcion?: number;
  dsctoPrimeraCuota?: number;
  observacion: string;
  fechaIniciaCobro: string;
  estado: string;
  plazoMesSeleccionado: number;
  version: number;
  idClienteEnGrupo?: any;

}
