import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface CuentaContableFindDto extends AbstractFindDto {
  nivel?: number;
  idAgencia?: number;
  idRubrosRol?: number;
  idNivel1?: number | string;
  idNivel2?: number | string;
  idNivel3?: number | string;
  idNivel4?: number | string;
  anio?: number;
  nombre?: string;
  mesDesde?:string;
  mesHasta?: string;
  identificadorCuentaContableDesde?: string; //identificador
  identificadorCuentaContableHasta?: string; //identificador
  
}
