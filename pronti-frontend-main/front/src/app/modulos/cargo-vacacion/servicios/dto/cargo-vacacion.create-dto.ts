export interface CargoVacacionCreateDto {

  // nombre: string;
  fechaDesde: string;
  fechaHasta: string;
  diasVacaciones: number;
  diasAntiguedad: number;
  diasTeoricos: number;
  diasTomados: number;
  diasSaldo: number;
  valorVacaciones: number;
  valorDias: number;
  valorAntiguedad: number;
  valorTeorico: number;
  valorTomado: number;
  valorSaldo: number;
  totalIngresosAnio: number;
  numAnioAcumulado: number;
  idTrabajdor: number;

}
