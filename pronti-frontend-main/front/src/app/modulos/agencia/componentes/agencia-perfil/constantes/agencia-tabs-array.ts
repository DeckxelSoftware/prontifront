import {FormAgenciaEnum} from '../../../form/form-agencia.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const AGENCIA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "agencia-descripcion",
    label: "Agencia descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormAgenciaEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "agencia-datos-generales",
    label: "Agencia datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormAgenciaEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
