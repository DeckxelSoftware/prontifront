import {FormSriGastosEnum} from '../../../form/form-sri-gastos.enum';
import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";


export const SRI_GASTOS_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "sri-gastos-descripcion",
    label: "Sri Gastos descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormSriGastosEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "sri-gastos-datos-generales",
    label: "Sri Gastos datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormSriGastosEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
