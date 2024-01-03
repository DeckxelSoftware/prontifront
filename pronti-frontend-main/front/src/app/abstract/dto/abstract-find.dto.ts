export class AbstractFindDto {
  id?: number;
  skip?: number;
  take?: number;
  busqueda?: string;
  sisHabilitado?: string;
  sortField?: string;
  sortAscending?: boolean;
}
