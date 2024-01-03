import { AbstractFindDto } from "../../../../abstract/dto/abstract-find.dto";

export interface EmpresaFindDto extends AbstractFindDto {
  tipoEmpresa?: string;
  claseContribuyente?: string;
}
