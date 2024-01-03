import {FormLineaImpuestoEnum} from '../../../form/form-linea-impuesto.enum';
import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";


export const LINEA_IMPUESTO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "linea-impuesto-descripcion",
    label: "Linea Impuesto descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormLineaImpuestoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "linea-impuesto-datos-generales",
    label: "Linea Impuesto datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormLineaImpuestoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
