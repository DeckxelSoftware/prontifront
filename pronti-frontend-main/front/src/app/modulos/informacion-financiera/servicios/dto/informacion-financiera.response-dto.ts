import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {FormaPagoEnum} from '../../../../enums/forma-pago.enum';
import {
  CuentaBancariaEmpresaResponseDto
} from "../../../cuenta-bancaria-empresa/servicios/dto/cuenta-bancaria-empresa.response-dto";

export interface InformacionFinancieraResponseDto extends AbstractResponseDto {
  // nombre?: string;
  formaPago?: FormaPagoEnum;
  cuentaBancariaEmpresaCollection?: CuentaBancariaEmpresaResponseDto[],

}
