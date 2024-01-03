import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";

export interface FacturaResponseDto extends AbstractResponseDto {
  // nombre?: string;
  itRuc?: string;
  itFactura?: string;
  itRazonSocial?: string;
  itNombreComercial?: string;
  itCodDoc?: string;
  itEstab?: string;
  itPtoEmision?: string;
  itNumeroDocumento?: string;
  ifIdentificacionComprador?: string;
  ifRazonSocialComprador?: string;
  ifDirEstablecimiento?: string;
  ifFechaEmision?: string;
  ifImporteTotal?: string;
  jsonFactura?: string;
}
