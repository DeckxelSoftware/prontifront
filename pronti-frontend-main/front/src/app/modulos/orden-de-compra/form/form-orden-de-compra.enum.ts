import {ProveedorResponseDto} from '../../proveedor/servicios/dto/proveedor.response-dto';
import {ContratoResponseDto} from '../../contrato/servicios/dto/contrato.response-dto';
import {ArticuloResponseDto} from '../../articulo/servicios/dto/articulo.response-dto';

export enum FormOrdenDeCompraEnum {
  // nombre = 'nombre',
  fechaInicio = 'fechaInicio',
  numeroOrdenContrato = 'numeroOrdenContrato',
  fechaCartaOferta = 'fechaCartaOferta',
  fechaRegistroOferta = 'fechaRegistroOferta',
  nombreCliente = 'nombreCliente',
  correo = 'correo',
  telefono = 'telefono',
  tipoDocumentoIdentidad = 'tipoDocumentoIdentidad',
  documentoIdentidad = 'documentoIdentidad',
  marca = 'marca',
  modelo = 'modelo',
  motor = 'motor',
  chasis = 'chasis',
  placa = 'placa',
  color = 'color',
  anio = 'anio',
  valorSinIva = 'valorSinIva',
  beneficiarioCheque = 'beneficiarioCheque',
  valorTotal = 'valorTotal',
  observacion = 'observacion',
  tipoVehiculo = 'tipoVehiculo',
  idProveedor = 'idProveedor',
  idContrato = 'idContrato',
  idArticulo = 'idArticulo',
}
