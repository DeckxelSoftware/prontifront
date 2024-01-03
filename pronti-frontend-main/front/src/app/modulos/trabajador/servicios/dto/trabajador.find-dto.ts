import {AbstractFindDto} from "../../../../abstract/dto/abstract-find.dto";
import {ModalidadContratoEnum} from '../../../../enums/modalidad-contrato';
import {GeneroEnum} from '../../../../enums/genero.enum';
import {SiNoEnum} from '../../../../enums/si-no.enum';

export interface TrabajadorFindDto extends AbstractFindDto {
  busqueda?: string;
  idUsuarioPais?: string;
  idUsuarioProvincia?: string;
  idUsuarioCiudad?: string;
  modalidadContrato?: ModalidadContratoEnum;
  estadoCivil?: string;
  genero?: GeneroEnum;
  grupoSanguineo?: string;
  nivelEstudios?: string;
  profesion?: string;
  estadoFamiliar?: string;
  // codigoSectorial?: string;
  tipoDiscapacidad?: string;
  discapacidad?: SiNoEnum;
  idAgencia?: number;
  idTrabajador?: number;
  idPeriodoLaboral?: number;
  anio?: number;
}
