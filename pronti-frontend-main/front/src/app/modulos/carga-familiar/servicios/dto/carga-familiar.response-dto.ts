import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";
import {SiNoEnum} from '../../../../enums/si-no.enum';
import {TrabajadorResponseDto} from '../../../trabajador/servicios/dto/trabajador.response-dto';
import {GeneroEnum} from '../../../../enums/genero.enum';

export interface CargaFamiliarResponseDto extends AbstractResponseDto {
  // nombre?: string;
  nombres?: string;
  apellidos?: string;
  parentesco?: string;
  tipoDocumento?: string;
  documentoIdentidad?: string;
  fechaNacimiento?: string;
  discapacidad?: SiNoEnum;
  estudia?: SiNoEnum;
  idTrabajador?: TrabajadorResponseDto;
  genero?: GeneroEnum;
  tipoDiscapacidad?: string;
  edad?: number;
  aplicaUtilidad?: SiNoEnum;
}
