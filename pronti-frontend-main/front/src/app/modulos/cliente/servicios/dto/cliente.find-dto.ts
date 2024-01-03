import { AbstractFindDto } from "../../../../abstract/dto/abstract-find.dto";

export interface ClienteFindDto extends AbstractFindDto {

  tipoCliente?: string;
  idEmpresa?: string;
  idUsuario?: string;
}
