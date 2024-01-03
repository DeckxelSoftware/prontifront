import {FormBancoEnum} from '../../../form/form-banco.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const BANCO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "banco-descripcion",
    label: "Banco descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormBancoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "banco-datos-generales",
    label: "Banco datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormBancoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
