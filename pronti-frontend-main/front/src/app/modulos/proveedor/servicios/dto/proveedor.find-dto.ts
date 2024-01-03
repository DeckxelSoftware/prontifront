import { AbstractFindDto } from "../../../../abstract/dto/abstract-find.dto";

export interface ProveedorFindDto extends AbstractFindDto {
    tipoProveedor?: string;
}
