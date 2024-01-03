import {PagoInterface} from "../../../cuota/rutas/ruta-cuota-cobro/ruta-cuota-cobro.component";

export interface CobroCreateDto {
  valorACobrar: number;
  pagoCollection: PagoInterface[];

  // nombre: string;

}
