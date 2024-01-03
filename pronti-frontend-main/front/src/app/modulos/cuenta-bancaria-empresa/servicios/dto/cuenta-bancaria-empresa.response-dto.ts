import {EmpresaResponseDto} from '../../../empresa/servicios/dto/empresa.response-dto';
import {BancoResponseDto} from "../../../banco/servicios/dto/banco.response-dto";

interface AbstractResponseDto {
}

export interface CuentaBancariaEmpresaResponseDto extends AbstractResponseDto {
  numeroCuenta?: string;
  tipoCuenta?: string;
  idEmpresa?: EmpresaResponseDto;
  idBanco?: BancoResponseDto;
  campoMostrar?: string;

}
