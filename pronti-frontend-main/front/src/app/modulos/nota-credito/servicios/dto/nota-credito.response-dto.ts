import { AbstractResponseDto } from "../../../../abstract/dto/abstract-response.dto";

export interface NotaCreditoResponseDto extends AbstractResponseDto {
  // nombre?: string;
  itRuc?: string;
  itRazonSocial?: string;
  itNombreComercial?: string;
  itCodDoc?: string;
  itEstab?: string;
  itPtoEmision?:string;
  itNumeroDocumento?: string;
  inIdentificacionComprador?: string;
  inRazonSocialComprador?: string;
  inCodDocModificado?:string;
  inNumDocModificado?: string;
  inDirEstablecimiento?: string;
  inFechaEmision?: string;
  inTotalSinImpuesto?: number;
  inValorModificado?: number;
  inMotivo?: string;
  jsonFactura?: any;
}
