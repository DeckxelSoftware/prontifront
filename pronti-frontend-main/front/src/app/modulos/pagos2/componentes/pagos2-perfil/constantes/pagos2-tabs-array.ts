import {FormPagos2Enum} from '../../../form/form-pagos2.enum';
import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";


export const PAGOS_2_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "pagos2-descripcion",
    label: "Pagos 2 descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormPagos2Enum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "pagos2-datos-generales",
    label: "Pagos 2 datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormPagos2Enum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
