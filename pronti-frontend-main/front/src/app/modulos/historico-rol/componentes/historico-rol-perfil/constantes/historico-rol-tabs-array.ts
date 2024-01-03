import {FormHistoricoRolEnum} from '../../../form/form-historico-rol.enum';
import { TabsArrays } from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const HISTORICO_ROL_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "historico-rol-descripcion",
    label: "Historico Rol descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormHistoricoRolEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "historico-rol-datos-generales",
    label: "Historico Rol datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormHistoricoRolEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
