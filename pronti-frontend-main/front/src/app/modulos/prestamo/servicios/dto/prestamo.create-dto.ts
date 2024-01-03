export interface PrestamoCreateDto {

  // nombre: string;
  tipoPrestamo: string;
  fechaPrestamo: string;
  comprobanteEgreso?: string;
  valor: number;
  cuotas: number;
  tasaInteres: number;
  concepto?: string;
  // estado: string;
  modalidadDescuento: string;
  totalPagado?: number;
  totalSaldo: number;
  nombreApellidoResponsable: string;
}
