export interface CuotaCreateDto {

  // nombre: string;
  fechaCobro: string;
  fechaMora: string;
  numeroCuota: number;
  valorCuota: number;
  valorPagadoCuota: number;
  valorTasaAdministrativa: number;
  valorImpuesto: number;
  abonoCapital: number;
  estaPagado: string;
  estaMora: string;
}
