import {AbstractFindDto} from '../../../../abstract/dto/abstract-find.dto';

export interface CuentaBancariaEmpresaFindDto extends AbstractFindDto {

  numeroCuenta?: string;
  tipoCuenta?: string;
  idEmpresa?: string;
  idBanco?: string;
}
