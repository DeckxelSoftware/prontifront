import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {ProveedorResponseDto} from '../../../proveedor/servicios/dto/proveedor.response-dto';
import {ContratoResponseDto} from '../../../contrato/servicios/dto/contrato.response-dto';
import {ArticuloResponseDto} from '../../../articulo/servicios/dto/articulo.response-dto';

export interface OrdenDeCompraResponseDto extends AbstractResponseDto {
  // nombre?: string;
  fechaInicio?: string;
  numeroOrdenContrato?: string;
  fechaCartaOferta?: string;
  fechaRegistroOferta?: string;
  nombreCliente?: string;
  correo?: string;
  telefono?: string;
  tipoDocumentoIdentidad?: string;
  documentoIdentidad?: string;
  marca?: string;
  modelo?: string;
  motor?: string;
  chasis?: string;
  placa?: string;
  color?: string;
  anio?: number;
  valorSinIva?: number;
  beneficiarioCheque?: string;
  valorTotal?: number;
  observacion?: string;
  tipoVehiculo?: string;
  idProveedor?: ProveedorResponseDto;
  idContrato?: ContratoResponseDto;
  idArticulo?: ArticuloResponseDto
}
