import {Detalle, InfoTributario, TotalConImpuesto} from '../../nota-credito/interfaces/nota-credito-detalle.interface';

export interface FacturaInterface {
  directorioGuardarXML: string;
  directorioGuardarXMLFirmados: string;
  nombreArchivoXML: string;
  nombreArchivoXMLFirmado: string;
  clave: string;
  directorioYNombreArchivoRegistroCivilP12: string;
  debug: boolean;
  infoTributario: InfoTributario;
  infoFactura: InfoFactura;
  detalles: Detalle[];
  infoAdicional?: InfoAdicional[];
}

export interface InfoFactura {
  fechaEmision: string;
  dirEstablecimiento: string;
  contribuyenteEspecial: string;
  obligadoContabilidad: string;
  tipoIdentificacionComprador: string;
  guiaRemision: string;
  razonSocialComprador: string;
  identificacionComprador: string;
  direccionComprador: string;
  totalSinImpuestos: string;
  totalDescuento: string;
  totalConImpuestos: TotalConImpuesto[];
  propina: string;
  importeTotal: string;
  moneda: string;
  pagos: Pago[];
  valorRetIva: string;
  valorRetRenta: string;
}

export interface Pago {
  formaPago: string;
  total: string;
  plazo: string;
  unidadTiempo: string;
}

export interface InfoAdicional {
  nombre: string;
  valor: string;
}
