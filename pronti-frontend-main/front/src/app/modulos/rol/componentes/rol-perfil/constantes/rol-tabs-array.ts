import {FormRolEnum} from '../../../form/form-rol.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const ROL_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "rol-descripcion",
    label: "Rol descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormRolEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "rol-datos-generales",
    label: "Rol datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormRolEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
