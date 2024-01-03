import {FormChequeEnum} from '../../../form/form-cheque.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const CHEQUE_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "cheque-descripcion",
    label: "Cheque descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormChequeEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "cheque-datos-generales",
    label: "Cheque datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormChequeEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
