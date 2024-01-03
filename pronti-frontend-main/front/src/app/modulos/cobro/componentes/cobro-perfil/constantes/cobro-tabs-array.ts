import {FormCobroEnum} from '../../../form/form-cobro.enum';
import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";


export const COBRO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "cobro-descripcion",
    label: "Cobro descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormCobroEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "cobro-datos-generales",
    label: "Cobro datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormCobroEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
