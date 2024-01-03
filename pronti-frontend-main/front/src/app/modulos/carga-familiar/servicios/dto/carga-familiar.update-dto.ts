import {SiNoEnum} from '../../../../enums/si-no.enum';

export interface CargaFamiliarUpdateDto {
  nombres?: string;
  apellidos?: string;
  parentesco?: string;
  tipoDocumento?: string;
  documentoIdentidad?: string;
  fechaNacimiento?: string;
  discapacidad?: SiNoEnum;
  tipoDiscapacidad?: string;
  estudia?: SiNoEnum;
  edad?: number;
  aplicaUtilidad?: SiNoEnum;
}
