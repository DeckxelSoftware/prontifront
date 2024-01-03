import {FormaPagoEnum} from '../../../../enums/forma-pago.enum';
import {
  CuentaBancariaEmpresaCreateDto
} from "../../../cuenta-bancaria-empresa/servicios/dto/cuenta-bancaria-empresa.create-dto";

export interface InformacionFinancieraCreateDto {

  // nombre: string;
  formaPago: FormaPagoEnum;
  idTrabajador: number;
  idCuentaBancariaEmpresa: CuentaBancariaEmpresaCreateDto;
}
