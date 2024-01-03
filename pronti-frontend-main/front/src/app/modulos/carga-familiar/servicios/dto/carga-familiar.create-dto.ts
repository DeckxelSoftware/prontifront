import {SiNoEnum} from '../../../../enums/si-no.enum';

export interface CargaFamiliarCreateDto {

  // nombre: string;
  nombres: string;
  apellidos: string;
  parentesco: string;
  tipoDocumento: string;
  documentoIdentidad: string;
  fechaNacimiento?: string;
  tipoDiscapacidad?: string;
  discapacidad: SiNoEnum;
  estudia: SiNoEnum;
  aplicaUtilidad?: SiNoEnum,
  edad: number;
  idTrabajador: number;
}
