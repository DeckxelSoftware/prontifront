import { AbstractResponseDto } from "../../../../abstract/dto/abstract-response.dto";

export interface RegionResponseDto extends AbstractResponseDto {
  nombre?: string;
  provincia?: string;
  ciudad?: string;
}
