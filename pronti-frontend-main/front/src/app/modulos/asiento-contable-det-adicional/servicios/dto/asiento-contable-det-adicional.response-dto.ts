import { AbstractResponseDto } from "../../../../abstract/dto/abstract-response.dto";

export interface AsientoContableDetAdicionalResponseDto extends AbstractResponseDto {
  // nombre?: string;
  // nombre: string;
  llave: string;
  valor: string;
  idAsientoContableCabecera?: AsientoContableDetAdicionalResponseDto;

}
