import {TipoDetallePagoEnum} from "../../../enums/tipo-detalle-pago.enum";

export interface DetalleCobroCuotaInterface {
  noCuota?: number;
  descripcion?: string;
  fecha?: string;
  valor?: number;
  aCobrar?: number;
  cantidadregistradaEnCobro?: number;
  tipo?: TipoDetallePagoEnum;
}
