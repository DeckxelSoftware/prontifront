import {FormRecursoEnum} from '../../../form/form-recurso.enum';
import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";


export const RECURSO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "recurso-descripcion",
    label: "Recurso descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormRecursoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "recurso-datos-generales",
    label: "Recurso datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormRecursoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
