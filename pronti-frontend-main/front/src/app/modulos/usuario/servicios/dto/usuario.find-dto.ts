import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface UsuarioFindDto extends AbstractFindDto {
  pais?: string;
  provincia?: string;
  ciudad?: string;
  tipoDocumentoIdentidad?: string;
}
