export interface AsientoContableCabeceraUpdateDto {

  // nombre?: string;

  fecha?: string;
  anio?: number;
  mesPeriodo?: string;
  tipoTransaccion?: string;
  tipoAsientoContable?: string;
  codigoReferencialAsientoContable?: string;
  totalDebito?: number;
  totalCredito?: number;
  totalSaldoActualFecha?: number;
  asientoCerrado?: string;
  idCheque?: number;

}
