import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {RegionResponseDto} from "../../../region/servicios/dto/region.response-dto";

export interface AgenciaResponseDto extends AbstractResponseDto {
  nombre?: string;
  direccion?: string;
  ciudad?: string;
  supervisorCollection?: any;
  idRegion?: RegionResponseDto;
}
