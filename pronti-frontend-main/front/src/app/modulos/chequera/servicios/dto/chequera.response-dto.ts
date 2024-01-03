import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {CuentaBancariaEmpresaResponseDto} from '../../../cuenta-bancaria-empresa/servicios/dto/cuenta-bancaria-empresa.response-dto';

export interface ChequeraResponseDto extends AbstractResponseDto {
  // nombre?: string;
  fechaEmision?: string;
  serieDesde?: number;
  serieHasta?: number;
  idCuentaBancariaEmpresa?: CuentaBancariaEmpresaResponseDto;
}
