import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";

export interface CabeceraCompraResponseDto extends AbstractResponseDto {
  // nombre?: string;
  id?: number;
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
  detalleCompraCollection?: DetalleCompra[]
}

export interface DetalleCompra {
  recurso?: string;
  descripcion?: string;
  cantidadFactura?: number;
  precioFactura?: number;
  descuento?: number;
  importe?: number;
  detalleImpuestoCollection?: DetalleImpuesto[];
}

export interface DetalleImpuesto {
  lineaImpuesto?: string;
  porcentaje?: number;
  valorImpuesto?: number;
  tasaImponible?: number;
  cuentaContable?: string;
}
