import {FormFiniquitoEnum} from '../../../form/form-finiquito.enum';
import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";


export const FINIQUITO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "finiquito-descripcion",
    label: "Finiquito descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormFiniquitoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "finiquito-datos-generales",
    label: "Finiquito datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormFiniquitoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
