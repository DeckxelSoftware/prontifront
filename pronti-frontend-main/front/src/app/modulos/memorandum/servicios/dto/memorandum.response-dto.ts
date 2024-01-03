import { AbstractResponseDto } from "../../../../abstract/dto/abstract-response.dto";

export interface MemorandumResponseDto extends AbstractResponseDto {
  // nombre?: string;
  fecha?: string;
  motivo?: string;
  observaciones?: string;
}
