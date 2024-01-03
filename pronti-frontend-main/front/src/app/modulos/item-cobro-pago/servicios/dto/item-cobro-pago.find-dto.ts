import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";

export interface ItemCobroPagoFindDto extends AbstractFindDto {
  idCuentaContable?: string;
  nombreItem?: string;
}
