export interface TransaccionAsientoContableCreateDto {

  // nombre: string;
  detalle?: string;
  valorDebito?: string;
  valorCredito?: number;
  numeroFactura?: string;
  idCuentaContable: number;

}
