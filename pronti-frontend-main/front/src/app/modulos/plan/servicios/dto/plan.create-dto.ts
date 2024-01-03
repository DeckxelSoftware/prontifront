import {ActivoInactivo} from "../../../../enums/activo-inactivo";

export interface PlanCreateDto {
  precio: number;
  plazoMesMinimo: number;
  plazoMesMaximo: number;
  modelo: string;
  marca: string;
  inscripcion: number;
  tasaAdministrativa: number;
  sisHabilitado: ActivoInactivo;
}
