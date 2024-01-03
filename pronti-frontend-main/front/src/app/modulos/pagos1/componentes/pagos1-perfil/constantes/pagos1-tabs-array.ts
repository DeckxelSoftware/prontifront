import {FormPagos1Enum} from '../../../form/form-pagos1.enum';
import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";


export const PAGOS_1_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "pagos1-descripcion",
    label: "Pagos 1 descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormPagos1Enum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "pagos1-datos-generales",
    label: "Pagos 1 datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormPagos1Enum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
