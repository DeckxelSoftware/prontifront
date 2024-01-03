import {FormPreasambleaEnum} from '../../../form/form-preasamblea.enum';
import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";


export const PREASAMBLEA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "preasamblea-descripcion",
    label: "Preasamblea descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormPreasambleaEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "preasamblea-datos-generales",
    label: "Preasamblea datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormPreasambleaEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
