import {FormCabeceraCompraEnum} from '../../../form/form-cabecera-compra.enum';
import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";


export const CABECERA_COMPRA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "cabecera-compra-descripcion",
    label: "Cabecera Compra descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormCabeceraCompraEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "cabecera-compra-datos-generales",
    label: "Cabecera Compra datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormCabeceraCompraEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
