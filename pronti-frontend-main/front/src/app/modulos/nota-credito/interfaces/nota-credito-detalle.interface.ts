import {InfoAdicional} from '../../factura/interfaces/factura.interface';

export interface NotaCreditoDetalleInterface {
  directorioGuardarXML: string;
  directorioGuardarXMLFirmados: string;
  nombreArchivoXML: string;
  nombreArchivoXMLFirmado: string;
  clave: string;
  directorioYNombreArchivoRegistroCivilP12: string;
  debug: boolean;
  infoTributario: InfoTributario;
  infoNotaCredito: InfoNotaCredito;
  detalles: Detalle[];
  infoAdicional?: InfoAdicional[];
}

export interface Detalle {
  codigoPrincipal: string;
  codigoAuxiliar?: string;
  unidadMedida?: any;
  descripcion: string;
  cantidad: string;
  precioUnitario: string;
  descuento: string;
  precioTotalSinImpuesto: string;
  detallesAdicionales?: any;
  impuestos: Impuesto[];
}

export interface Impuesto {
  codigo: string;
  codigoPorcentaje: string;
  tarifa: string;
  baseImponible: string;
  valor: string;
}

interface InfoNotaCredito {
  fechaEmision: string;
  dirEstablecimiento: string;
  tipoIdentificacionComprador: string;
  razonSocialComprador: string;
  identificacionComprador: string;
  contribuyenteEspecial: string;
  obligadoContabilidad: string;
  rise: string;
  codDocModificado: string;
  numDocModificado: string;
  fechaEmisionDocSustento: string;
  totalSinImpuestos: string;
  valorModificacion: string;
  moneda: string;
  totalConImpuesto: TotalConImpuesto[];
  motivo: string;
}

export interface TotalConImpuesto {
  codigo: string;
  codigoPorcentaje: string;
  descuentoAdicional?: any;
  baseImponible: string;
  valor: string;
  tarifa?: any;
  valorDevolucionIva?: any;
}

export interface  InfoTributario {
  ambiente: string;
  tipoEmision: string;
  razonSocial: string;
  nombreComercial: string;
  ruc: string;
  claveAcceso?: any;
  codDoc: string;
  estab: string;
  ptoEmision: string;
  secuencial: string;
  dirMatriz: string;
}
