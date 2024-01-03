import {DetalleCompra} from "./cabecera-compra.response-dto";

export interface CabeceraCompraCreateDto {

  // nombre: string;
  nombreProveedor?: string;
  rucProveedor?: string;
  autorizacion?: string;
  numeroDocumento?: string;
  serie?: string;
  fechaRecepcion?: string;
  fechaEmision?: string;
  fechaVencimiento?: string;
  version?: number;
  terminosPago?: string;
  tipoDocumento?: string;
  subtotal?: number;
  impuesto?: number;
  totalFactura?: number;
  retenciones?: number;
  valorAPagar?: number;
  detalleCompraCollection?: DetalleCompra[];
  idRecurso?: number;
  idAgencia?: number;
}
