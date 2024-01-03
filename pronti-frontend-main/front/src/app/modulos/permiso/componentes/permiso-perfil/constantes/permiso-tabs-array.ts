import {FormPermisoEnum} from '../../../form/form-permiso.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const PERMISO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "permiso-descripcion",
    label: "Permiso descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormPermisoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "permiso-datos-generales",
    label: "Permiso datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormPermisoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
