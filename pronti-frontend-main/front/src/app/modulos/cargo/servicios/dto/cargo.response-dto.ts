import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {AreaResponseDto} from '../../../area/servicios/dto/area.response-dto';

export interface CargoResponseDto extends AbstractResponseDto {
  nombre?: string;
  // sueldo?: number;
  idArea?: AreaResponseDto;
}
