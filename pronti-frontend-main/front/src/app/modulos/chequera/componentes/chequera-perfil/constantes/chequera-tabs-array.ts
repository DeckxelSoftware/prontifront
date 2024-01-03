import {FormChequeraEnum} from '../../../form/form-chequera.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const CHEQUERA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "chequera-descripcion",
    label: "Chequera descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormChequeraEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "chequera-datos-generales",
    label: "Chequera datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormChequeraEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
