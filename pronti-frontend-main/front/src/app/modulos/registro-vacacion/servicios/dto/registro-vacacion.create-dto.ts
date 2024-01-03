export interface RegistroVacacionCreateDto {

  // nombre: string;
  fechaDesde: string;
  fechaHasta: string;
  diasTomados: number;
  valorTomado: number;
  estaPagado: string;
  nombreApellidoResponsable: string;
  fechaPago?: string;
  comprobantePago?: string;
  valorPagado?: number;




}
